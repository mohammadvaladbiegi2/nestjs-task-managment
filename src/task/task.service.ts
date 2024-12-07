import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { Project } from 'src/project/entities/project.entity';
import { TaskstatusEnum } from './enum/task.enum';

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>
  ) { }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { projectid, ...taskData } = createTaskDto;

    try {
      const project = await this.projectRepository.findOne({
        where: { id: +projectid },
        select: ['id', 'title'],
      });

      if (!project) {
        throw new NotFoundException(`Project with ID ${projectid} not found`);
      }

      const newTask = this.taskRepository.create({ ...taskData, project });
      return await this.taskRepository.save(newTask);

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error
      }

      throw new Error(`Failed to create task: ${error.message}`);
    }
  }


  async findTask(
    status?: TaskstatusEnum,
    projectid?: number,
    limit: number = 5,
    page: number = 1
  ): Promise<Task[]> {
    const queryBuilder = this.taskRepository.createQueryBuilder('task')
      .leftJoinAndSelect('task.project', 'project')
      .orderBy('task.id', 'ASC')
      .skip((page - 1) * limit)
      .take(limit);

    if (status) {
      queryBuilder.andWhere('task.status = :status', { status });
    }

    if (projectid) {
      queryBuilder.andWhere('project.id = :projectid', { projectid });
    }

    const tasks = await queryBuilder.getMany();

    if (tasks.length === 0) {
      throw new NotFoundException(`No tasks found for project with ID ${projectid}`)
    }

    return tasks.map(task => {
      delete task.project;
      return task;
    });
  }


  async findOne(id: number) {
    try {
      const task = await this.taskRepository.findOneByOrFail({ id })
      if (!task) {
        throw new NotFoundException(`No tasks found for project with ID ${id}`)
      }
      return task
    } catch (error) {
      throw new BadRequestException('Failed to find task detailse');
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    if (updateTaskDto.projectid) {
      const project = await this.projectRepository.findOne({
        where: { id: updateTaskDto.projectid },
        select: ['id', 'title'],
      });
      if (!project) {
        throw new NotFoundException(`Project with ID ${updateTaskDto.projectid} not found`);
      }

      task.project = project;
    }

    Object.assign(task, updateTaskDto);

    return await this.taskRepository.save(task);
  }


  async remove(id: number): Promise<void> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    await this.taskRepository.remove(task);
  }
}
