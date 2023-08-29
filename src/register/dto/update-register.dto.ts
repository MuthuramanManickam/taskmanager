import { PartialType } from '@nestjs/swagger';
import { SignupDto } from './create-register.dto';

export class UpdateRegisterDto extends PartialType(SignupDto) {}
