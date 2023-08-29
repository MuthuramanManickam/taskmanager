import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users, UserPassword } from './entities/register.entity';
import { MailService } from 'src/mail-service/mail/mail.service';
import { HelperService } from 'src/helper/helper.service';

@Module({
  imports : [
    TypeOrmModule.forFeature([
      Users ,
      UserPassword
    ])
  ],
  controllers: [RegisterController],
  providers: [RegisterService,MailService,HelperService]
})
export class RegisterModule {}
