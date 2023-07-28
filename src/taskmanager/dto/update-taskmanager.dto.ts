import { PartialType } from '@nestjs/swagger';
import { CreateTaskmanagerDto } from './create-taskmanager.dto';

export class UpdateTaskmanagerDto extends PartialType(CreateTaskmanagerDto) {}
