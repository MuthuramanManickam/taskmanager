import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Matches } from "class-validator";
import { Transform } from "class-transformer";

export class SignupDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Matches('^[a-zA-Z ]+$')
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Transform(({ value }) => value.toLowerCase().trim())
    email: string;

    // @ApiProperty()
    // @IsNotEmpty()
    // @IsString()
    // password : string;

}