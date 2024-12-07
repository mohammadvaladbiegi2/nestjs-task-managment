import { Controller, Get, Post, Body, Param, Delete, Query, Put, Res, HttpStatus } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskstatusEnum } from './enum/task.enum';
import { Response } from 'express';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Res() res: Response) {
    const result = await this.taskService.create(createTaskDto);
    return res.status(HttpStatus.CREATED).json({
      data: result,
      message: 'Task Created Successfully',
      statusCode: HttpStatus.CREATED
    });
  }

  @Get()
  async findAll(
    @Res() res: Response,
    @Query('status') status?: TaskstatusEnum,
    @Query('limit') limit?: number,
    @Query('page') page?: number,
    @Query('projectid') projectid?: number,
  ) {
    const tasks = await this.taskService.findTask(status, projectid, limit, page);
    return res.status(HttpStatus.OK).json({
      data: tasks,
      message: 'Tasks Found Successfully',
      statusCode: HttpStatus.OK
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const task = await this.taskService.findOne(+id);
    return res.status(HttpStatus.OK).json({
      data: task,
      message: 'Task Found Successfully',
      statusCode: HttpStatus.OK
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Res() res: Response
  ) {
    const result = await this.taskService.update(+id, updateTaskDto);
    return res.status(HttpStatus.OK).json({
      data: result,
      message: 'Task Updated Successfully',
      statusCode: HttpStatus.OK
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const result = await this.taskService.remove(+id);
    return res.status(HttpStatus.OK).json({
      data: result,
      message: 'Task Deleted Successfully',
      statusCode: HttpStatus.OK
    });
  }
}
