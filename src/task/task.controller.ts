import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Controller('task')
@ApiTags('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('addTask')
  create(@Body() createTaskDto: CreateTaskDto ,@Req() req:Request , @Res() res:Response) {
    const obj={
      name:createTaskDto.name,
      description:createTaskDto.description,
      date:createTaskDto.date
    }
    return this.taskService.createUserTask(obj);
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
