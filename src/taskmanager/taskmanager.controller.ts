import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskmanagerService } from './taskmanager.service';
import { CreateTaskmanagerDto } from './dto/create-taskmanager.dto';
import { UpdateTaskmanagerDto } from './dto/update-taskmanager.dto';

@Controller('taskmanager')
export class TaskmanagerController {
  constructor(private readonly taskmanagerService: TaskmanagerService) {}

  @Post()
  create(@Body() createTaskmanagerDto: CreateTaskmanagerDto) {
    return this.taskmanagerService.create(createTaskmanagerDto);
  }

  @Get()
  findAll() {
    return this.taskmanagerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskmanagerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskmanagerDto: UpdateTaskmanagerDto) {
    return this.taskmanagerService.update(+id, updateTaskmanagerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskmanagerService.remove(+id);
  }
}
