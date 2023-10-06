import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { WinstonModule } from "nest-winston";
import { NotificationModule } from './notification/notification.module';
import { TaskmanagerModule } from './taskmanager/taskmanager.module';
import * as winston from "winston";
import 'winston-daily-rotate-file';
import { MulterModule } from "@nestjs/platform-express";
import { UserModule } from './user/user.module';
import { RegisterModule } from './register/register.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [   
    ConfigModule.forRoot({
      envFilePath:'.env'
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      // synchronize: true,
      autoLoadEntities: true,
    }),
    WinstonModule.forRoot({
      level: "info",
      format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
      winston.format.colorize(),
      winston.format.errors()
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.DailyRotateFile({
          filename: 'task-manager-%DATE%.log',
          level: "info",
          dirname: 'logs/',
          handleExceptions: true,
          json: false,
          zippedArchive: true,
          maxSize: '50m'
        })
      ]
    }),
    MulterModule.register({
      dest:'./uploads',
    }),
    MailerModule.forRoot({
      transport: {
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      defaults: {
        from: '"No Reply" <admin@finstein.ai>',
      },
      preview: false,
      template: {
        dir: join(__dirname, "mail-service", 'template'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    UserModule,
    RegisterModule ,
    TaskModule,
    NotificationModule,
    TaskmanagerModule,
    PaymentModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
