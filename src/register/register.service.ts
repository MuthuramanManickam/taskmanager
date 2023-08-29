import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPassword, Users } from './entities/register.entity';
import { Repository } from 'typeorm';
import { waitForDebugger } from 'inspector';
import * as moment from 'moment';
import { IUpdatePassword } from 'src/interface/register.interface';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(UserPassword)
    private readonly userPasswordRepository: Repository<UserPassword>
  ) { }

  async checkMailExist(email: SignupDto['email']) {
    return this.userRepository.findOne({
      select: ['id', 'name', 'email', 'isActive', 'isVerified'],
      where: { email }
    })
  }

  async registerUser(data: SignupDto, generatePassword: string) {
    const user = await this.userRepository.save(data);
    const temporaryPassword = {
      userId :user.id,
      temporaryPassword : generatePassword,
      createBy :user.id,
      expiredTime :moment(new Date()).format('D/M/YYYY h:mm:ss A')
    }
    await this.userPasswordRepository.save(temporaryPassword)
    return user;
  }

  async savePassword(updatePassword :IUpdatePassword){
    await this.userPasswordRepository.save(updatePassword)
  }

}
