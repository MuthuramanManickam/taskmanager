import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import * as express from 'express';
import { Request } from 'express';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException('No data submitted');
    }

    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object, { skipMissingProperties: true });

    if (errors.length > 0) {
      throw new BadRequestException(this.formatErrors(errors));
    }

    const req = value as express.Request;
    await req.body('name', 'Invalid name').isAlpha().run();

    return value;
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatErrors(errors: any[]) {
    const formattedErrors = errors.map(err => {
      for (const property in err.constraints) {
        return err.constraints[property];
      }
    });

    return formattedErrors.join(', '); // Join the error messages
  }
}
