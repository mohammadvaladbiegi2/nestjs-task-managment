import { Controller, Get, Post, Body, Param, Delete, Query, Put, Res, HttpStatus } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectStatus } from './enums/projectStatus.enum';
import { Response } from 'express';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto, @Res() res: Response) {
    const result = await this.projectService.create(createProjectDto);
    return res.status(HttpStatus.CREATED).json({
      data: result,
      message: 'create Project Successfully',
      statusCode: HttpStatus.CREATED
    })
  }

  @Get()
  async findProjects(
    @Res() res: Response,
    @Query('status') status?: ProjectStatus,
    @Query('limit') limit?: number,
    @Query('page') page?: number,
  ) {
    const projects = await this.projectService.findprojects(status, limit, page);

    return res.status(HttpStatus.OK).json({
      data: projects,
      message: 'Projects Founded',
      statusCode: HttpStatus.OK
    })
  }

  @Get(':id')
  async findOne(@Param('id') id: string,
    @Res() res: Response
  ) {
    const project = await this.projectService.findOne(+id);
    return res.status(HttpStatus.OK).json({
      data: project,
      message: 'Project Founded',
      statusCode: HttpStatus.OK
    })
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto,
    @Res() res: Response
  ) {
    const resulte = await this.projectService.update(+id, updateProjectDto);
    return res.status(HttpStatus.OK).json({
      data: resulte,
      message: 'Project Updated',
      statusCode: HttpStatus.OK
    })
  }

  @Delete(':id')
  async remove(@Param('id') id: string,
    @Res() res: Response
  ) {
    const resulte = await this.projectService.remove(+id);
    return res.status(HttpStatus.OK).json({
      data: resulte,
      message: 'Project Deleted',
      statusCode: HttpStatus.OK
    })
  }
}
