import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { moduleConfig } from 'config/Module/module.config';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { dataBaseConfig } from 'config/DBconfig/postgresSQL.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataBaseConfig),
    ConfigModule.forRoot(moduleConfig),
    ProjectModule,
    TaskModule
  ]
})
export class AppModule { }
