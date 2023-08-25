import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsBoolean, IsDate, IsDateString, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Matches } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Matches('^[a-zA-Z ]+$')
    @IsAlpha('en-US',{message : 'name can  only contain alphabetic character'})
    name: string
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Matches('^[0-9/-]+$')
    dateOfBirth: string;

    @ApiProperty()
    @IsString()
    gender: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    phoneNumber: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    address: string;

    // @IsNotEmpty()
    // @IsBoolean()
    // isActive: boolean;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    createdBy: number;

    // @IsOptional()
    // @IsNumber()
    // updateby: number;

    // @IsOptional()
    // @IsNumber()
    // deletedBy: number;
}


