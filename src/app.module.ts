import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataBaseConfig } from 'config/DBconfig/postgresSQL.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataBaseConfig)
  ]
})
export class AppModule { }
