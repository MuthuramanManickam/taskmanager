import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, HttpStatus, Inject, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from "express";
import { User } from './entities/user.entity';
import { error } from 'winston';
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags("User")
export class UserController {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger ,private readonly userService: UserService) {}

  @Post('addNewUser')
  async addNewUser(@Body() createUserDto: CreateUserDto , @Res() res:Response , @Req() req:Request) {
    const userId = 1; // req['user']['id']
    try {
      this.logger.info(`${UserController.name} | addNewUser() | RequestId : ?  | ${userId} | Successfully entered /addNewUser `);
      createUserDto['createdBy'] = userId;
      await this.userService.addNewUser(createUserDto);
      this.logger.info(`${UserController.name} | addNewUser() - addNewUser() | RequestId : ?  | ${userId} | User has been added successfull`);
      return res.status(HttpStatus.OK).json({
        message: "User has been added successfull",
        success: true
      })
    } catch (error) {
      this.logger.info(`${UserController.name} | addNewUser() | RequestId : ? | ${userId}  | Error in /addNewUser | ${error.stack} `);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
        success: false
      }) 
    }
  }

  @Get('getUsers')
  async getUsers(@Res() res: Response, @Req() req: Request) {
    const userId = 1;
    try {
      this.logger.info(`${UserController.name} | getUsers() | RequestId : ?  | ${userId} | Successfully entered /getUsers `);
      const users = await this.userService.getUsers()
      this.logger.info(`${UserController.name} | getUsers() - getUsers() | RequestId : ?  | ${userId} | getUsers fetched Successfully  `);
      
      if (users?.length > 0) {
        this.logger.info(`${UserController.name} | getUsers() | RequestId : ?  | ${userId} | GetAll User information retrieved successfully `);
        return res.status(HttpStatus.OK).json({
        message: 'GetAll User information retrieved successfully',
        success: true,
        data: users,
      });
    }
    return res.status(HttpStatus.OK).json({
      message :'User not found',
      success:false
    })
    } catch (error) {
      this.logger.info(`${UserController.name} | getUsers() | RequestId : ? | ${userId}  | Error in /getUsers | ${error.stack} `);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
        success: false
      })
    }
  }
  @Get('getUserById/:id')
  async getUserById(@Param('id') id:number , @Res() res: Response, @Req() req: Request) {
    const userId = 1;
    try {
      this.logger.info(`${UserController.name} | getUserById() | RequestId : ?  | ${userId} | Successfully entered /getUserById `);
      const user = await this.userService.getUserById(id)
      this.logger.info(`${UserController.name} | getUserById() - getUserById() | RequestId : ?  | ${userId} | getUserById fetched Successfully  `);
      if (user && Object.keys(user).length > 0) {
          this.logger.info(`${UserController.name} | getUserById() | RequestId : ?  | ${userId} | User information retrieved successfully `);
          return res.status(HttpStatus.OK).json({
          message: 'User information retrieved successfully',
          success: true,
          data: user,
        });
      }
      return res.status(HttpStatus.OK).json({
        message :'User not found',
        success:false
      })
    } catch (error) {
      this.logger.info(`${UserController.name} | getUserById() | RequestId : ? | ${userId}  | Error in /getUserById | ${error.stack} `);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "An internal server error occurred",
        success: false
      })
    }
  }
  @Put('updateUser/:id')
  async updateUser(@Param('id') id: number, @Body() updateTaskDto: UpdateUserDto, @Res() res: Response, @Req() req: Request) {
    const userId = 1;
    try {
      this.logger.info(`${UserController.name} | updateUser() | RequestId : ? | ${userId} | Successfully entered /updateUser `);
      const user = await this.userService.updateUser(id,updateTaskDto);
      this.logger.info(`${UserController.name} | updateUser() - updateById() | RequestId : ? | ${userId} | updateUser Successfully `);
      return res.status(HttpStatus.OK).json({
        message: 'User updated successfully',
        success: true,
        data: user,
      });
    } catch (error) {
      this.logger.info(`${UserController.name} | updateUser() | RequestId : ? | ${userId} | Error in / updateUser() | ${error.stack}`);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "An internal server error occurred",
        success: false
      })
    }
  }

  @Delete('deleteUser/:id')
  async deleteUser(@Param('id') id: number, @Res() res: Response, @Req() req: Request) {
    const userId = 1;
    try {
      this.logger.info(`${UserController.name} | deleteUser() | RequestId : ?  | ${userId} | Successfully entered /deleteUser/:id `);
      const users = await this.userService.deleteById(id);
      if(users?.affected) {
        this.logger.info(`${UserController.name} | deleteUser() - deleteById() | RequestId : ? | ${userId} | deleteUser Successfully  `);
        return res.status(HttpStatus.OK).json({
            message: 'User has been deleted Successfully' ,
            success: true,
            data: users
          });
      }
        this.logger.info(`${UserController.name} | deleteUser() - deleteById() | RequestId : ? | ${userId} | No data found for the id ${id} `);
        return res.status(HttpStatus.OK).json({
            message: 'No data found' ,
            success: false,
          });
    } catch (error) {
      this.logger.info(`${UserController.name} | deleteUser() | RequestId : ? | ${userId} | Error in / deleteUser() | ${error.stack} `);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "An internal server error occurred",
        success: false
      })
    }
  }



}
