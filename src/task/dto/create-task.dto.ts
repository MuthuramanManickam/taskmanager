import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Matches } from "class-validator";


export class UploadFile{
    @IsNotEmpty()
    file: File;
}
export class CreateTaskDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Matches('^[a-zA-Z ]+$')
    name: string

    @ApiProperty()
    @IsString()
    date: Date

    @ApiProperty()
    @IsOptional()
    @IsString()
    description: string;
}
export class DeleteTaskDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id: number;
}

export class UpdatedTaskDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Matches('^[a-zA-Z ]+$')
    name: string

    @ApiProperty()
    @IsString()
    date: Date

    @ApiProperty()
    @IsOptional()
    @IsString()
    description: string;
}

export class GetTaskHistoryDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    page: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    searchInput: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    sortField: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    sortOrder: number;

}