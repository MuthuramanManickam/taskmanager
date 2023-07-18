import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, HttpStatus, Put, NotFoundException } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Response } from "express";
import { Task } from './entities/task.entity';

@Controller('task')
@ApiTags('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post('addTask')
  async create(@Body() createTaskDto: CreateTaskDto, @Res() res: Response, @Req() req: Request) {
    try {
      const obj = {
        name: createTaskDto.name,
        description: createTaskDto.description,
        date: createTaskDto.date
      }
      await this.taskService.createUserTask(obj);
      return res.status(HttpStatus.OK).json({
        message: "addTask successfully",
        data: [],
        success: true
      })
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
        success: false
      })
    }
  }
  @Put('deleteTask')
  async updateData(@Body() updateTaskDto: UpdateTaskDto, @Res() res: Response, @Req() req: Request) {
    try {
      const obj= await this.taskService.findById(updateTaskDto.id);
      return res.status(HttpStatus.OK).json({
        message: 'Item has been soft deleted',
        success:true,
        data: obj, // Return the updated item if needed
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
        success: false
      })
    }
  }

@Get('getAllUser')
async getAllUser( @Res() res: Response, @Req() req: Request){
  try {
    const get= await this.taskService.getUserData()
    return res.status(HttpStatus.OK).json({
      message: 'Get All the user list Successfully',
      success:true,
      data: get, // Return the updated item if needed
    });
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
      success: false
    })
  }
}

@Put('editTask')
async editData(@Param('id') id: string,@Body() updateTaskDto: CreateTaskDto, @Res() res: Response, @Req() req: Request) {
  try {
    const obj= await this.taskService.editById(updateTaskDto.id,updateTaskDto);
    return res.status(HttpStatus.OK).json({
      message: 'Edit data Successfully',
      success:true,
      data: obj, // Return the updated item if needed
    });
  } catch (error) {
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
