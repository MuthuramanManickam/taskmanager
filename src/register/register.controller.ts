import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpStatus, Inject } from '@nestjs/common';
import { RegisterService } from './register.service';
import { SignupDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { HelperService } from 'src/helper/helper.service';
import { EmailSubjects, EmailTemplate } from 'src/enum/enum';
import { MailService } from 'src/mail-service/mail/mail.service';
import * as moment from 'moment';
import { Logger, error } from "winston";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { generatePrimeSync } from 'crypto';
import Mail from 'nodemailer/lib/mailer';
import { User } from 'src/user/entities/user.entity';
import { log } from 'console';



@Controller('register')
@ApiTags('Registrations')
export class RegisterController {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger, private readonly registerService: RegisterService, private mailService: MailService, private helper: HelperService) { }

  @Post('addUser')
  async addUser(@Body() dataArray: SignupDto[], @Req() req: Request, @Res() res: Response) {
    const userId = req['user']?.['id'] || 1;
    try {
      this.logger.info(`${RegisterController.name} | addUser() | RequestId : ? | Succesfully entered /addUser`);
      let successResponses = [];
      let errorResponses = [];
      const emailArray = dataArray.map(e => e.email);
      if (!emailArray.length) {
        this.logger.info(`${RegisterController.name} | addUser() | ${userId} | RequestId : ? | Username and/or email cannot be empty /addUser`);
        return // no data found
      }
      const isMailExist = await this.registerService.checkUser(userId);
      this.logger.info(`${RegisterController.name} | addUser() - checkUser() | ${userId} | RequestId : ? | Check user /addUser`);
      const existMails = isMailExist.map(e => e.email);
      if (isMailExist.length) {  //isVerified true
        this.logger.info(`${RegisterController.name} | addUser() - checkUser()| ${userId} | RequestId : ? | Email already exist with verified`);
        existMails.forEach((email) => {
          errorResponses.push({
            email: email,
            message: "Something Went Wrong"
          })
        })
      }
      const validUsers = dataArray.filter(user => !existMails.includes(user.email));
      const validUserObjects = validUsers.map(user => ({ name: user.name, email: user.email }));
      if (validUserObjects.length) {
       const values = await this.registerService.registerUser(validUserObjects, userId)
        this.logger.info(`${RegisterController.name} | addUser() - registerUser()| ${userId} | RequestId : ? | User registered successfully /addUser`);
        values.forEach((e) => {
          successResponses.push({
            email: e.email,
            name: e.name,
            password: e.temporaryPassword,
            message: "Register successfully"
          })
        })
        if (values.length) {
          for (const response of successResponses) {
            const userMailOptions = {
              mail: response.email,
              subject: EmailSubjects.ADD_EMAIL,
              template: EmailTemplate.ADD_EMAIL,
              name: response.name,
              generatePassword: response.password,
              expireTime: 5,
            };
            const mailSend = await this.mailService.sendMail(userMailOptions);
            if (mailSend) {
              this.logger.info(`${RegisterController.name} | addUsers() - sendMail() | ${userId} | RequestId : ? | Successfully mail sent`);
            } else {
              errorResponses.push({
                email: response.email,
                message: "Mail not sent",
              });
              this.logger.error(`${RegisterController.name} | addUsers() - sendMail() | ${userId} | RequestId : ? | Mail not sent`);
            }
          }

        }
      }
      const successResponse =successResponses.map((e)=> {
        delete e.password 
        return e
      })
      const errorResponse = errorResponses.map((e)=>{
        delete e.password
        return e 
      })
      console.log("successs",successResponses);
      console.log("error",errorResponses );
      return res.status(HttpStatus.OK).json({
        message : "Users added successfully",
        success : true ,
        data :{successResponse, errorResponses} 
      })
    } catch (error) {
      this.logger.error(`${RegisterController.name} | addUser() | ${userId} | RequestId : ? | Error in /addUser | ${error.stack}`);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
        success: false
      })
    }
  }
}
