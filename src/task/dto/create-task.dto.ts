import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { TaskstatusEnum } from "../enum/task.enum";

export class CreateTaskDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    descriptions: string;

    @IsEnum(TaskstatusEnum, {
        message: "The status must be either 'set' / 'done' / 'doing' or 'cancel'."
    })
    @IsOptional()
    status: TaskstatusEnum;

    @IsNotEmpty()
    @IsNumber()
    projectid: number
}
