import { Injectable } from "@nestjs/common";
import { ProjectStatus } from "../enums/projectStatus.enum";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

@Injectable()
export class CreateProjectDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string

    @ApiProperty({
        enum: ProjectStatus,
        description: "possible values ==>  'disable' or 'enable'."
    })
    @IsNotEmpty()
    @IsEnum(ProjectStatus, {
        message: "The status must be either 'disable' or 'enable'."
    })
    status: ProjectStatus
}
