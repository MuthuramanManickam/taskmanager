import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPassword, Users } from './entities/register.entity';
import { In, Repository } from 'typeorm';
import { waitForDebugger } from 'inspector';
import * as moment from 'moment';
import { IUpdatePassword } from 'src/interface/register.interface';
import { HelperService } from 'src/helper/helper.service';
import { log } from 'console';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(UserPassword)
    private readonly userPasswordRepository: Repository<UserPassword>,
    private helper : HelperService
  ) { }

  async checkMailExist(email: SignupDto['email']) {
    return this.userRepository.findOne({
      select: ['id', 'name', 'email', 'isActive', 'isVerified'],
      where: { email }
    })
  }

  async checkUser(email:SignupDto['email'][]){
   return this.userRepository.find({
    select :['id','email','isActive','isVerified','name'],
    where : {email : In(email), isVerified : true}
   })
  }

  async registerUser(data:SignupDto[], userId : number){
    console.log(data,'service data');
    const user = await this.userRepository.save(data);
    console.log("user",user);
    
    const setPassword = user.map(e => ({
      userId :e.id,
      name :e.name ,
      email :e.email,
      temporaryPassword :this.helper.generatePassword(),
      createdBy : userId,
      expiredTime : moment(new Date()).format('D/M/YYYY h:mm:ss A')
    }))
    console.log("setpass",setPassword);
    const pass = await this.userPasswordRepository.save(setPassword)
    console.log("pass",pass);
    
    // const temporaryPassword = {
    //   userId :user,
    //   temporaryPassword : generatePassword,
    //   createBy :user.id,
    //   expiredTime :moment(new Date()).format('D/M/YYYY h:mm:ss A')
    // }
    // await this.userPasswordRepository.save(temporaryPassword)
    return pass;
  }

  async savePassword(updatePassword :IUpdatePassword){
    await this.userPasswordRepository.save(updatePassword)
  }

}
