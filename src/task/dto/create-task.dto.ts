import { ApiProperty } from "@nestjs/swagger";
import {  IsNotEmpty ,IsNumber,IsOptional, IsString, Matches } from "class-validator";


export class CreateTaskDto {

   

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Matches('^[a-zA-Z ]+$')
    name:string

    @ApiProperty()
    @IsString()
    date:Date

    @ApiProperty()
    @IsOptional()
    @IsString()
    description: string;
}
