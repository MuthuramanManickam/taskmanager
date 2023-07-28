import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Taskmanager {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(() => TeamMember, (teamMember) => teamMember.id)
    @JoinColumn({ name: 'assignedTo' })
    assignedTo: number;

    @ManyToOne(() => TeamMember, (teamMember) => teamMember.id)
    @JoinColumn({ name: 'assignedBy' })
    assignedBy: number;

    @ManyToOne(() => Status, (status) => status.id)
    @JoinColumn({ name: 'statusId' })
    status: number;

    @Column()
    dueDate: Date;

    @Column()
    difficultiesFaced:string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ nullable: true })
    createdBy: number;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ nullable: true })
    updatedby: number;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ nullable: true })
    deletedBy: number;

    @DeleteDateColumn()
    deletedAt: Date;


}

export class Status {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ nullable: true })
    createdBy: number;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ nullable: true })
    updatedby: number;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ nullable: true })
    deletedBy: number;

    @DeleteDateColumn()
    deletedAt: Date;

}

export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => TeamMember, (teamMember) => teamMember.id)
    @JoinColumn({ name: 'teamMemberId' })
    teamMemberId: number;

    @Column({ default: true })
    isActive: boolean;

    @Column({ nullable: true })
    createdBy: number;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ nullable: true })
    updatedby: number;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ nullable: true })
    deletedBy: number;

    @DeleteDateColumn()
    deletedAt: Date;

}
export class TeamMember {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    role: string;

    @Column()
    email: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ nullable: true })
    createdBy: number;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ nullable: true })
    updatedby: number;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ nullable: true })
    deletedBy: number;

    @DeleteDateColumn()
    deletedAt: Date;
}
