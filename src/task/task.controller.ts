import { Controller, Get, Post, Param, Delete, Res, Req, HttpStatus, Put, Inject, UploadedFile, UseInterceptors, UploadedFiles, Body } from '@nestjs/common';
import { ApiTags, ApiConsumes, ApiBody } from "@nestjs/swagger";
import { TaskService } from './task.service';
import { CreateTaskDto, GetTaskHistoryDto, UpdatedTaskDto, UploadFile } from './dto/create-task.dto';
import { Response } from "express";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { ExpressAdapter, FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { diskStorage } from 'multer';
import { promises } from 'dns';
import * as fs from 'fs';
import * as path from 'path';
const BASE_FILES_DIR = path.join(__dirname, '..','..', 'files');

@Controller('task')
@ApiTags('task')
export class TaskController {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger, private readonly taskService: TaskService) { }

  @Post('Upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Uploaded file',
    type: UploadFile,
  })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: 'files', filename: (req, file, cb) => {
        const name = file.originalname.split(".")[0];
        const fileExtension = file.originalname.split(".")[1];
        const newFileName = name.split(" ").join("_") + ("_") + Date.now() + "." + fileExtension;
        cb(null, newFileName);
      },
    }),
  }))
  async uploadFile(@Body() Body: UploadFile, @UploadedFile() file : Express.Multer.File) {
}

@Get('files')
async getAllFiles(@Res() res: Response) {
  console.log("Path",BASE_FILES_DIR)
  try {
    const files = await fs.promises.readdir(BASE_FILES_DIR);
      res.json(files);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching files' });
  }
}

  @Get('file/:filename')
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = path.join(BASE_FILES_DIR, filename);
    console.log(filePath, 'filepath');
    res.sendFile(filePath);
  }



  // @Post('local')
  // @UseInterceptors(
  //   FileInterceptor('file', {storage: diskStorage({destination: './public/img',filename: (req, file, cb) => {
  //     const name =file.originalname.split(".")[0];
  //     console.log('name',name);

  //     const fileExtension =file.originalname.split(".")[1];
  //     const newFileName = name.split(" ").join("_")+("_")+Date.now()+"."+fileExtension;
  //     cb(null, newFileName);
  //       },
  //     }),
  //   }),
  // )
  // async save(@UploadedFile() file: Express.Multer.File, @Body() body: UploadFile, @Req() req: Request, @Res() res: Response) {
  //   console.log(file, 'fileeee');
  //   // try {
  //   //   const thumbnailFilename = file.filename.replace(/\.[^/.]+$/, '');
  //   //   const thumbnailPath = `${thumbnailFilename}`;

  //   //   this.taskService.save(file.path, thumbnailPath)
  //   //   return res.status(HttpStatus.OK).json({
  //   //     statusCode: 200,
  //   //     success:true,
  //   //     data: file.path,
  //   //   })
  //   // } catch (error) {
  //   //   this.logger.info(` ${TaskController.name} | addTask() | RequestId: ?  | Error in / addTask() | ${error.stack} | `)

  //   //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
  //   //     message: "Internal server error",
  //   //     success: false
  //   //   })
  //   // }


  // }



  @Post('addTask')
  async addTask(@Body() createTaskDto: CreateTaskDto, @Res() res: Response, @Req() req: Request) {
    const userId = req?.['task']?.['id']
    try {
      this.logger.info(` ${TaskController.name} | addTask() | RequestId: ? | ${userId} | Succesfully entered / addTask | `)
      const user = {
        name: createTaskDto.name,
        description: createTaskDto.description,
        date: createTaskDto.date
      }
      await this.taskService.addUserTask(user);
      this.logger.info(` ${TaskController.name} | addTask() - addUserTask() | RequestId: ? | ${userId} | addTask Succesfully | `)

      return res.status(HttpStatus.OK).json({
        message: "addTask successfully",
        success: true
      })

    } catch (error) {
      this.logger.info(` ${TaskController.name} | addTask() | RequestId: ? | ${userId} | Error in / addTask() | ${error.stack} | `)

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
        success: false
      })
    }
  }

  @Delete('deleteTask/:id')
  async deleteTask(@Param('id') id: number, @Res() res: Response, @Req() req: Request) {
    const userId = "User";
    try {
      this.logger.info(`${TaskController.name} | deleteTask() | RequestId : ?  | ${userId} | Successfully entered / deleteTask | `);

      const taskObj = await this.taskService.deleteById(id);
      this.logger.info(`${TaskController.name} | deleteTask() - deleteById() | RequestId : ? | ${userId} | deleteTask Successfully | `);

      return res.status(HttpStatus.OK).json({
        message: 'Item has been  deleted',
        success: true,
        data: taskObj, // Return the updated item if needed
      });

    } catch (error) {
      this.logger.info(`${TaskController.name} | deleteTask() | RequestId : ? | ${userId} | Error in / deleteTask() | ${error.stack} | `);

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
        success: false
      })
    }
  }

  @Get('getAllTasks')
  async getAllTasks(@Res() res: Response, @Req() req: Request) {
    const userId = "User";
    try {
      this.logger.info(`${TaskController.name} | getAllUser() | RequestId : ?  | ${userId} | Successfully entered / getAllUser | `);

      const getUser = await this.taskService.getUserData()
      this.logger.info(`${TaskController.name} | getAllUser() - getUserData() | RequestId : ?  | ${userId} | getalluser fetched Successfully  | `);

      return res.status(HttpStatus.OK).json({
        message: 'Get All the user list Successfully',
        success: true,
        data: getUser,
      });

    } catch (error) {
      this.logger.info(`${TaskController.name} | getAllUser() | RequestId : ? | ${userId}  | Error in / getAllUser() | ${error.stack} | `);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
        success: false
      })
    }
  }

  @Get('getAllTaskById/:id')
  async getAllTaskById(@Req() req: Request, @Res() res: Response, @Param('id') id: number) {
    const userId = 1
    try {
      this.logger.info(`${TaskController.name} | getAllTaskById() | RequestId : ?  | ${userId} | Successfully entered / getAllTaskById | `);

      const getUserById = await this.taskService.getAllTaskById(id)
      console.log('....iddd', getUserById);

      this.logger.info(`${TaskController.name} | getAllTaskById() -getAllTaskById() | RequestId : ?  | ${userId} | getAllTaskById  Successfully | `);
      return res.status(HttpStatus.OK).json({
        message: " getAllTaskById fetched data successfully",
        success: true,
        data: getUserById
      })
    } catch (error) {
      this.logger.info(`${TaskController.name} | getAllTaskById() | RequestId : ? | ${userId}  | Error in / getAllTaskById() | ${error.stack} | `);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
        success: false
      })
    }
  }

  @Put('updateTask/:id')
  async updateTask(@Param('id') id: number, @Body() updateTaskDto: UpdatedTaskDto, @Res() res: Response, @Req() req: Request) {

    const userId = id
    try {
      this.logger.info(`${TaskController.name} | updateTask() | RequestId : ? | ${userId} | Successfully entered / updateTask | `);

      const updateTask = await this.taskService.updateById(id, updateTaskDto);
      this.logger.info(`${TaskController.name} | updateTask() - updateById() | RequestId : ? | ${userId} | updateTask Successfully | `);

      return res.status(HttpStatus.OK).json({
        message: 'updateTask data Successfully',
        success: true,
        data: updateTask, // Return the updated item if needed
      });
    } catch (error) {
      this.logger.info(`${TaskController.name} | updateTask() | RequestId : ? | ${userId} | Error in / updateTask() | ${error.stack} |`);

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
        success: false
      })
    }
  }

  @Post('getTaskHistory')
  async getTaskHistory(@Req() req: Request, @Res() res: Response, @Body() data: GetTaskHistoryDto) {
    const UserId = 1
    try {
      this.logger.info(`${TaskController.name} | getTaskHistory() | RequestId : ? | ${UserId} | Successfully entered / getTaskHistory | `);

      const taskHistory = await this.taskService.getTaskHistory(UserId, data)
      this.logger.info(`${TaskController.name} | getTaskHistory() - getTaskHistory() | RequestId : ? | ${UserId} | getTaskHistory Successfully  | `);
      return res.status(HttpStatus.OK).json({
        message: "Fetched Task history successfully",
        data: taskHistory,
        success: true
      })
    } catch (error) {
      this.logger.error(`${TaskController.name} | getTaskHistory() | ${UserId} | RequestId : ? | Error in /getTaskHistory | ${error.stack} |`);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
        success: false
      })
    }
  }
  @Post('getTaskHistoryTable')
  async getTable(@Body() data:CreateTaskDto ,@Req() req: Request, @Res() res: Response ) {
    const UserId = 1
    try {
      this.logger.info(`${TaskController.name} | getTaskHistory() | RequestId : ? | ${UserId} | Successfully entered / getTaskHistory | `);

      const taskHistory = await this.taskService.getTabel(data)
      console.log(taskHistory,'taskHistory');
      
      this.logger.info(`${TaskController.name} | getTaskHistory() - getTaskHistory() | RequestId : ? | ${UserId} | getTaskHistory Successfully  | `);
      return res.status(HttpStatus.OK).json({
        message: "Fetched Task history successfully",
        data: taskHistory,
        success: true
      })
    } catch (error) {
      this.logger.error(`${TaskController.name} | getTaskHistory() | ${UserId} | RequestId : ? | Error in /getTaskHistory | ${error.stack} |`);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Internal server error",
        success: false
      })
    }
  }
  

}



