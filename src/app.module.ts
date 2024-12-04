import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataBaseConfig } from 'config/DBconfig/postgresSQL.config';
import { moduleConfig } from 'config/Module/module.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataBaseConfig),
    ConfigModule.forRoot(moduleConfig)
  ]
})
export class AppModule { }
