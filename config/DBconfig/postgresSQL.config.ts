import { TypeOrmModuleOptions } from "@nestjs/typeorm";
const dataBaseConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '',
    database: 'task-managment',
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],

    synchronize: true,

} satisfies TypeOrmModuleOptions

export { dataBaseConfig }