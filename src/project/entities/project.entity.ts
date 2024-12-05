import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProjectStatus } from "../enums/projectStatus.enum";
import { Task } from "src/task/entities/task.entity";

@Entity()
export class Project {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;


    @Column({ type: 'enum', enum: ProjectStatus, default: ProjectStatus.Enable })
    status: ProjectStatus;

    @OneToMany(() => Task, (task) => task.project)
    tasks: Task[]
}
