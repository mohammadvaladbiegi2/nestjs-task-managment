import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { ProjectStatus } from './enums/projectStatus.enum';

@Injectable()
export class ProjectService {

  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>
  ) { }

  async create(createProjectDto: CreateProjectDto): Promise<Project | Error> {
    try {
      const newProject = this.projectRepository.create(createProjectDto)

      await this.projectRepository.save(newProject)
      return newProject
    } catch (error) {
      throw new InternalServerErrorException('Unexpected error occurred while creating the project.');
    }

  }

  async findprojects(status?: ProjectStatus, limit: number = 5, page: number = 1): Promise<Project[] | Error> {
    const projects = this.projectRepository.createQueryBuilder('project')

    if (status) {
      projects.where('status = :status', { status }) // filter whit status
    }

    projects.orderBy('project.id', 'ASC').skip((page - 1) * limit).take(limit) // pagenations
    return projects.getMany()
  }

  async findOne(id: number): Promise<Project | Error> {
    try {
      const project = await this.projectRepository.findOne({
        where: { id },
        relations: ['tasks'],
      });

      if (!project) {
        throw new NotFoundException('Project not found');
      }

      return project;
    } catch (error) {

      throw new BadRequestException('Failed to retrieve project details');
    }
  }


  async update(id: number, updateProjectDto: UpdateProjectDto): Promise<string | Error> {
    const project = await this.projectRepository.findOneBy({ id })

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    try {
      await this.projectRepository.update(id, updateProjectDto)
      return 'update successfully'
    } catch (error) {
      throw new InternalServerErrorException('Unexpected error occurred while updat the project.');

    }
  }

  async remove(id: number): Promise<string | Error> {
    try {
      const project = await this.projectRepository.findOneBy({ id });
      if (!project) {
        throw new NotFoundException(`Project with ID ${id} not found`);
      }

      await this.projectRepository.delete(id);

      return `Project with ID ${id} successfully deleted`
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new BadRequestException('An error occurred while deleting the project');
    }
  }
}
