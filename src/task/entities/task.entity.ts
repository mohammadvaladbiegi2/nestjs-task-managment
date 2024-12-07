import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskstatusEnum } from "../enum/task.enum";
import { Project } from "src/project/entities/project.entity";
@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    descriptions: string

    @Column({ type: 'enum', enum: TaskstatusEnum, default: TaskstatusEnum.Set })
    status: TaskstatusEnum

    @ManyToOne(() => Project, (project) => project.id)
    project: Project

}
