import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, HttpStatus, Put, Inject, NotFoundException } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Response } from "express";
import { Task } from './entities/task.entity';
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { AppController } from 'src/app.controller';

@Controller('task')
@ApiTags('task')
export class TaskController {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger, private readonly taskService: TaskService) { }

  @Post('addTask')
  async create(@Body() createTaskDto: CreateTaskDto, @Res() res: Response, @Req() req: Request) {
    try {
      this.logger.info(` ${TaskController.name} | create() | RequestId: ? | Succesfully entered / addTask | `)
      const obj = {
        name: createTaskDto.name,
        description: createTaskDto.description,
        date: createTaskDto.date
      }

      await this.taskService.createUserTask(obj);
      this.logger.info(` ${TaskController.name} | create() - createUserTask() | RequestId: ? | Add addTask Succesfully | `)
      return res.status(HttpStatus.OK).json({
        message: "addTask successfully",
        data: [],
        success: true
      })
    } catch (error) {
      this.logger.info(` ${TaskController.name} | create() | RequestId: ? | Error in /create() |${error.stack} | `)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
        success: false
      })
    }
  }
  @Put('deleteTask')
  async updateData(@Body() updateTaskDto: UpdateTaskDto, @Res() res: Response, @Req() req: Request) {
    try {
      this.logger.info(`${TaskController.name} | updateData() | RequestId : ?  | Successfully entered / deleteTask | `);

      const obj= await this.taskService.findById(updateTaskDto.id);
      this.logger.info(`${TaskController.name} | updateData() - findById() | RequestId : ?  | delete  deleteTask Successfully | `);
      return res.status(HttpStatus.OK).json({
        message: 'Item has been soft deleted',
        success:true,
        data: obj, // Return the updated item if needed
      });
    } catch (error) {
      this.logger.info(`${TaskController.name} | updateData() | RequestId : ?  | Error in / updateData() | ${error.stack} | `);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
        success: false
      })
    }
  }

@Get('getAllUser')
async getAllUser( @Res() res: Response, @Req() req: Request){
  try {
    this.logger.info(`${TaskController.name} | getAllUser() | RequestId : ?  | Successfully entered / getAllUser | `);

    const get= await this.taskService.getUserData()
    this.logger.info(`${TaskController.name} | getAllUser() -getUserData() | RequestId : ?  | Get getalluser Successfully  | `);
    return res.status(HttpStatus.OK).json({
      message: 'Get All the user list Successfully',
      success:true,
      data: get, // Return the updated item if needed
    });
  } catch (error) {
    this.logger.info(`${TaskController.name} | getAllUser() | RequestId : ?  | Error in /getAllUser() | ${error.stack} | `);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
      success: false
    })
  }
}

@Put('editTask')
async editData(@Body() updateTaskDto: UpdateTaskDto, @Res() res: Response, @Req() req: Request) {
  try {
    this.logger.info(`${TaskController.name} | editData() | RequestId : ?  | Successfully entered / editData | `);

    const obj= await this.taskService.editById(updateTaskDto.id,updateTaskDto);
    this.logger.info(`${TaskController.name} | editData() -editById() | RequestId : ?  | Edit editTask Successfully | `);

    return res.status(HttpStatus.OK).json({
      message: 'Edit data Successfully',
      success:true,
      data: obj, // Return the updated item if needed
    });
  } catch (error) {
    this.logger.info(`${TaskController.name} | editData() | RequestId : ?  | Error in /editData() | ${error.stack} |`);

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
      success: false
    })
  }
}


  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
