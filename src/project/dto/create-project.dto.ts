import { Injectable } from "@nestjs/common";
import { ProjectStatus } from "../enums/projectStatus.enum";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

@Injectable()
export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    @IsEnum(ProjectStatus, {
        message: "The status must be either 'disable' or 'enable'."
    })
    status: ProjectStatus
}
