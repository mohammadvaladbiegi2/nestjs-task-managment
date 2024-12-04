import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const dataBaseConfig = {
    type: 'postgres',
    username: 'postgres',
    password: '',
    port: 5432,
    host: 'localhost',
    database: 'task-managment',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true
} satisfies TypeOrmModuleOptions

export { dataBaseConfig }