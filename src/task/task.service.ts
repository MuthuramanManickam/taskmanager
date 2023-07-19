import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm/repository/Repository';
import { promises } from 'dns';
import { ReturnDocument } from 'typeorm';

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(Task)
    private readonly userRepositry: Repository<Task>
  ) { }

  async createUserTask(taskData:any) {
    return this.userRepositry.save(taskData)
  }

  async findById(id:number):Promise<any> {
    await this.userRepositry.softDelete(id);
    return  this.userRepositry.update(id,{isActive:false});
  }

  async editById(id:number,updateTaskDto:UpdateTaskDto):Promise<any> {
    await this.userRepositry.update(id,updateTaskDto)
  }

  async getUserData(): Promise<any> {
    return this.userRepositry.find({
        where:{isActive:true},
        select: ['id', 'name','date','description']
    })
   
}





  create(createTaskDto: CreateTaskDto) {
    return 'This action adds a new task';
  }

  findAll() {
    return `This action returns all task`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
