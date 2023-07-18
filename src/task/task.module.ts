import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeORMError } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Task  } from "./entities/task.entity";

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   // Your TypeORM configuration here
    //   // ...
    //   entities: [Task], // Include the Task entity here
    // }),
    TypeOrmModule.forFeature([
      Task
    ])
  ],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
