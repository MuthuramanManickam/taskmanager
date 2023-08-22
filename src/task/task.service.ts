import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTaskDto, UpdatedTaskDto, UploadFile } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm/repository/Repository';
import { promises } from 'dns';
import { ReturnDocument } from 'typeorm';
import { async } from 'rxjs';
import sharp from 'sharp';

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(Task)
    private readonly userRepositry: Repository<Task>
  ) { }

  // async save(input:string, output:string){
  //   try {
  //     const thumbnailBuffer = await sharp(input)
  //       .resize(200, 200)
  //       .toBuffer();

  //     await sharp(thumbnailBuffer).toFile(output);
  //   } catch (error) {
  //     throw new Error('Failed to create thumbnail');
  //   }
  // }
  async addUserTask(taskData:any) {
    return this.userRepositry.save(taskData)
  }

  async deleteById(id:number):Promise<any> {
    await this.userRepositry.softDelete(id);
    return  this.userRepositry.update(id,{isActive:false});
  }

  async updateById(id:number,updateTaskDto:UpdatedTaskDto):Promise<any> {
    await this.userRepositry.update(id,updateTaskDto)
  }

  async getUserData(): Promise<any> {
    return this.userRepositry.find({
        where:{isActive:true},
        select: ['id', 'name','date','description'],
    })
}
async getTabel(data:any){
  return this.userRepositry.find(data)
}

async getTaskHistory(id:number , taskDataDetails :any):Promise<any>{
  let {searchInput ,sortField ,sortOrder ,page } =taskDataDetails
  const rows = 5;
  const offset = page * rows;
  let sortFields = ['name','date','description'];
  let checkSort = sortFields.includes(sortField);
  sortField =  checkSort ?sortField:'createdAt';
  sortOrder = sortOrder==1 ? 'DESC':'ASC'

  if (searchInput) {
   const  taskData = await this.userRepositry.createQueryBuilder('tm')
    .orderBy(sortField,sortOrder)
    // .limit(rows)
    // .offset(offset)
    .where(
      `tm.name LIKE :searchInput ||
      tm.date LIKE :searchInput OR
      tm.description LIKE :searchInput`,
      { searchInput: `%${searchInput}%`,id}
    )
    .getManyAndCount();
            const [data, length] = taskData;
            return {
                data: data,
                length: length
            }
  }
  const taskData = await this.userRepositry.createQueryBuilder('um')
            .orderBy(sortField, sortOrder)
            // .where('tm.userId = :id', { id})
            .limit(rows)
            .offset(offset)
            .getManyAndCount();
        const [data, length] = taskData;
        return {
            data: data,
            length: length
        }
}

getAllTaskById(id:number){
  console.log('id.......................',id)
  return this.userRepositry.createQueryBuilder('byId')
    .select(['byId.id as id','byId.name as name','byId.date as date','byId.description as description'])
    .where('byId.id =:id',{id})
    .getRawOne()
}



}
