import { Injectable } from '@nestjs/common';
import { CreateTaskmanagerDto } from './dto/create-taskmanager.dto';
import { UpdateTaskmanagerDto } from './dto/update-taskmanager.dto';

@Injectable()
export class TaskmanagerService {
  create(createTaskmanagerDto: CreateTaskmanagerDto) {
    return 'This action adds a new taskmanager';
  }

  findAll() {
    return `This action returns all taskmanager`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taskmanager`;
  }

  update(id: number, updateTaskmanagerDto: UpdateTaskmanagerDto) {
    return `This action updates a #${id} taskmanager`;
  }

  remove(id: number) {
    return `This action removes a #${id} taskmanager`;
  }
}
