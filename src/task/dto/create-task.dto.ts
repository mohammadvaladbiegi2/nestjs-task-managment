import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { TaskstatusEnum } from "../enum/task.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    descriptions: string;

    @ApiProperty({
        enum: TaskstatusEnum,
        description: 'possible values ==> set  / done / doing or cancel '
    })
    @IsEnum(TaskstatusEnum, {
        message: "The status must be either 'set' / 'done' / 'doing' or 'cancel'."
    })
    @IsOptional()
    status: TaskstatusEnum;

    @ApiProperty({
        default: 1,
        description: 'id project you wana create a task for it'
    })
    @IsNotEmpty()
    @IsNumber()
    projectid: number
}
