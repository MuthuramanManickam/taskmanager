import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Not, Repository } from 'typeorm';
import { Task } from 'src/task/entities/task.entity';

@Injectable()
export class UserService {
  constructor( 
    @InjectRepository(User)
    private readonly userRepositry: Repository<User>
  ) { }


  async addNewUser(data:CreateUserDto) : Promise<User> {
    return await this.userRepositry.save(data);
  }

  async getUsers(){
    return await this.userRepositry.find({
        where:{isActive:true},
        select: ['id', 'name','address','dateOfBirth','email','gender'],
    })
  }

  async updateUser(id:number,updateTaskDto:UpdateUserDto){
    return await this.userRepositry.update(id,updateTaskDto)
  }

  async deleteById(id:number){
    const isDeleted = await this.userRepositry.createQueryBuilder('u')
      .where(`u.isActive = :isActive and u.deletedAt is null and u.id = :id`,{isActive : true ,id})
      .getOne()
    if (isDeleted != null) {
      await this.userRepositry.softDelete(id);
      return this.userRepositry.update(id,{isActive:false});
    }
  }

  async getUserById(id: number){
    return await this.userRepositry.createQueryBuilder('u')
    .select(['u.id as id','u.name as name','u.dateOfBirth as dateOfBirth','u.address as address , u.email as email , u.gender as gender , u.phoneNumber as phoneNumber'])
    .where ('u.id =:id and u.isActive = :isActive',{id, isActive : true})
    .getRawOne()
  }
  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
