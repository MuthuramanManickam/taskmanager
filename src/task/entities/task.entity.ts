import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    date: Date;

    @Column()
    description: string;

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

// export class LeaveType {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column()
//     name: string;

//     @Column({ default: true })
//     isActive: boolean;

//     @Column({ nullable: true })
//     createdBy: number;

//     @CreateDateColumn()
//     createdAt: Date;

//     @Column({ nullable: true })
//     updatedby: number;

//     @UpdateDateColumn()
//     updatedAt: Date;

//     @Column({ nullable: true })
//     deletedBy: number;

//     @DeleteDateColumn()
//     deletedAt: Date;
// }


// export class LeaveStatus {

//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column()
//     name: string;

//     @Column({ default: true })
//     isActive: boolean;

//     @Column({ nullable: true })
//     createdBy: number;

//     @CreateDateColumn()
//     createdAt: Date;

//     @Column({ nullable: true })
//     updatedby: number;

//     @UpdateDateColumn()
//     updatedAt: Date;

//     @Column({ nullable: true })
//     deletedBy: number;

//     @DeleteDateColumn()
//     deletedAt: Date;
// }

// export class Leave {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column()
//     startDate: Date;

//     @Column()
//     endDate: Date;

//     @Column()
//     reason: string;

//     @ManyToOne(() => LeaveStatus, (leavestatus) => leavestatus.id)
//     @JoinColumn({ name: 'leaveStatusId' })
//     leaveStatusId: number;

//     @ManyToOne(() => LeaveType, (leaveType) => leaveType.id)
//     @JoinColumn({ name: 'leaveTypeId' })
//     leaveType: number;

//     @Column({ default: false })
//     isCancel: boolean;

//     @Column({default:true})
//     isActive:boolean;

//     @Column({nullable : true}) 
//     createdBy:number;

//     @CreateDateColumn() 
//     createdAt:Date;

//     @Column({nullable:true}) 
//     updatedby:number;

//     @UpdateDateColumn() 
//     updatedAt:Date;

//     @Column({nullable:true}) 
//     deletedBy:number;

//     @DeleteDateColumn() 
//     deletedAt:Date;
// }

// export class User{
//     @PrimaryGeneratedColumn()
//     id:number;

//     @Column() 
//     name:string;

//     @Column() 
//     age:number;

//     @Column() 
//     email:number;

//     @Column()
//     dateOfBirth: Date;

//     @Column({default:true})
//     isActive:boolean;

//     @Column({nullable : true}) 
//     createBy:number;

//     @CreateDateColumn() 
//     createAt:Date;

//     @Column({nullable:true}) 
//     updateby:number;

//     @UpdateDateColumn() 
//     updateAt:Date;

//     @Column({nullable:true}) 
//     deleteBy:number;

//     @DeleteDateColumn() 
//     deleteAt:Date;
// }
