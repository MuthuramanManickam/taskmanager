import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as multer from 'multer';
import { join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  const config = new DocumentBuilder()
    .setTitle('Simple CRUD API')
    .setDescription('CRUD Using NestJS and MySQL')
    .setVersion('1.0').addTag('CRUD').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  
  // app.useGlobalInterceptors()
  // app.post('/upload', upload.single('file'), (req, res) => {
  //   res.send('File uploaded successfully');
  // });
  // app.useGlobalInterceptors(new FileInterceptor('file'));
  await app.listen(3000);
}
bootstrap();
