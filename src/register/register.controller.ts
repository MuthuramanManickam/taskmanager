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



@Controller('register')
@ApiTags('Registrations')
export class RegisterController {
  constructor( @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,private readonly registerService: RegisterService ,private   mailService: MailService,private helper: HelperService) {}

  @Post('addUser')
  async addUser(@Body() data:SignupDto ,@Req() req :Request ,@Res() res :Response){
    try {
      this.logger.info(`${RegisterController.name} | addUser() | ${data.email} | RequestId : ? | Succesfully entered /addUser`);
      const isExist = await this.registerService.checkMailExist(data.email)
      this.logger.info(`${RegisterController.name} | addUser() - checkMailExist() | ${data.email} | RequestId : ? | Check mail if exist or not`);
      if (!isExist) {

        const generatePassword = await this.helper.generatePassword()
        // const hashPassword = await this.helper.hashPassword(generatePassword)
        const mailOptions = {
          mail: data.email,
          subject: EmailSubjects.VERIFY_EMAIL,
          template: EmailTemplate.VERIFY_EMAIL,
          name: data.name,
          generatePassword :generatePassword ,
          expireTime: 5
        }
        const registerUser = await this.registerService.registerUser(data , generatePassword)
        this.logger.info(`${RegisterController.name} | addUser() - registerUser() | ${data.email} | RequestId : ? | Succesfully  register user`);
        const mailSend = await this.mailService.sendMail(mailOptions)
        if (mailSend) {
          this.logger.info(`${RegisterController.name} | addUser() - sendMail() | ${data.email} | RequestId : ? | Succesfully mail sent`);
          return res.status(HttpStatus.OK).json({
            message: "Successfully registered",
            data: registerUser,
            success: true
          })
        }
        this.logger.error(`${RegisterController.name} | addUser() - sendMail() | ${data.email} | RequestId : ? | Mail not send`);
        return res.status(HttpStatus.FAILED_DEPENDENCY).json({
          message: "Mail not send", 
          success: false
        })
      }
      if (isExist.isVerified) {
        this.logger.info(`${RegisterController.name} | addUser() - checkMailExist() | ${data.email} | RequestId : ? | Email already exist with verified`);
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: "Something went wrong",
          success: false
        })
      }
      const generatePassword = await this.helper.generatePassword()
      // const hashPassword = await this.helper.hashPassword(generatePassword)
      const mailOptions = {
        mail: data.email,
        subject: EmailSubjects.VERIFY_EMAIL,
        template: EmailTemplate.VERIFY_EMAIL,
        name: data.name,
        generatePassword :generatePassword ,
        expireTime: 5
      }
      const updatePassword ={
        temporaryPassword : generatePassword ,
        createdBy : isExist.id,
        userId : isExist.id ,
        expiredTime :moment(new Date()).format('D/M/YYYY h:mm:ss A')
       }
       await this.registerService.savePassword(updatePassword);
      this.logger.error(`${RegisterController.name} | addUser() - savePassword() | ${data.email} | RequestId : ? | Error in /addUser `);
       return res.status(HttpStatus.OK).json({
        message : "updateUser Successfully" ,
        success : true

       })

    } catch (error) {
      this.logger.error(`${RegisterController.name} | addUser() | ${data.email} | RequestId : ? | Error in /addUser | ${error.stack}`);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
        success: false
      })
    }
  }
  
}
