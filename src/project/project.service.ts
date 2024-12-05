import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { SuccessesResponsType } from 'types/succssesResponse.type';

@Injectable()
export class ProjectService {

  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>
  ) { }

  async create(createProjectDto: CreateProjectDto): Promise<SuccessesResponsType<Project> | Error> {
    try {
      const newProject = this.projectRepository.create(createProjectDto)

      await this.projectRepository.save(newProject)
      return {
        data: newProject,
        message: 'create Project Successfully',
        statusCode: 201
      }
    } catch (error) {
      throw new InternalServerErrorException('Unexpected error occurred while creating the project.');
    }

  }

  async findAll(): Promise<Project[] | Error> {
    const projects = await this.projectRepository.find()

    if (!projects.length) {
      throw new NotFoundException('No projects found.')
    }

    return projects
  }

  async findOne(id: number): Promise<Project | Error> {
    const user = await this.projectRepository.findOne({ where: { id } })

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
