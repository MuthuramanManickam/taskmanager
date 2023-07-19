import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { WinstonModule } from "nest-winston";
import { NotificationModule } from './notification/notification.module';
import * as winston from "winston";
import 'winston-daily-rotate-file';

@Module({
  imports: [
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
          filename: 'dr.finstein-%DATE%.log',
          level: "info",
          dirname: 'logs/',
          handleExceptions: true,
          json: false,
          zippedArchive: true,
          maxSize: '50m'
        })
      ]
    }),
   
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
      // synchronize: false,
      autoLoadEntities: true,
    }),
    TaskModule,
    NotificationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
