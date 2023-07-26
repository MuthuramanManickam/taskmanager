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

    // @ManyToOne(() => User , (user) => user.id)
    // @JoinColumn({name:'userId'})
    // userId:number;

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

@Entity()
export class LeaveType {
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

@Entity()
export class LeaveStatus {

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
@Entity()
export class LeaveEntry {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column()
    reason: string;

    @ManyToOne(() => LeaveStatus, (leavestatus) => leavestatus.id)
    @JoinColumn({ name: 'leaveStatusId' })
    leaveStatusId: number;

    @ManyToOne(() => LeaveType, (leaveType) => leaveType.id)
    @JoinColumn({ name: 'leaveTypeId' })
    leaveTypeId: number;

    @ManyToOne(() => User , (user) => user.id)
    @JoinColumn({name:'userId'})
    userId:number

    @Column({ default: false })
    isCancel: boolean;

    @Column({default:true})
    isActive:boolean;

    @Column({nullable : true}) 
    createdBy:number;

    @CreateDateColumn() 
    createdAt:Date;

    @Column({nullable:true}) 
    updatedby:number;

    @UpdateDateColumn() 
    updatedAt:Date;

    @Column({nullable:true}) 
    deletedBy:number;

    @DeleteDateColumn() 
    deletedAt:Date;
}
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    firstName: string;
    
    @Column()
    lastName: string;
    
    @Column()
    dateOfBirth: Date;
    
    @ManyToOne(() => Gender, gender => gender.id)
    @JoinColumn({ name: 'genderId' })
    genderId: number;
    
    @Column()
    email: string;
    
    @Column()
    phoneNumber: string;
    
    @Column()
    address: string;

    @Column({default:true})
    isActive:boolean;

    @Column({nullable : true}) 
    createdBy:number;

    @CreateDateColumn() 
    createdAt:Date;

    @Column({nullable:true}) 
    updateby:number;

    @UpdateDateColumn() 
    updatedAt:Date;

    @Column({nullable:true}) 
    deletedBy:number;

    @DeleteDateColumn() 
    deletedAt:Date;
}
@Entity()
export class Roles {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ default: true })
    isActive: boolean;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'createdBy' })
    createdBy : number;
  
    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'updatedBy' })
    updatedBy : number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'deletedBy' })
    deletedBy : number;
  
    @DeleteDateColumn()
    deletedAt: Date;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}
@Entity()
export class UserRoleMapping{
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(() => Roles ,(roles) => roles.id)
    @JoinColumn({name:'roleId'})
    roleId:number;

    @ManyToOne(() =>User,(user)=>user.id)
    @JoinColumn({name:'userId'})
    userId:number;

    @Column({default:true})
    isActive:boolean;

    @Column({nullable : true}) 
    createdBy:number;

    @CreateDateColumn() 
    createdAt:Date;

    @Column({nullable:true}) 
    updatedby:number;

    @UpdateDateColumn() 
    updatedAt:Date;

    @Column({nullable:true}) 
    deletedBy:number;

    @DeleteDateColumn() 
    deletedAt:Date;

}

@Entity()
export class Gender {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ default: true })
    isActive: boolean;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'createdBy' })
    createdBy : number;
  
    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'updatedBy' })
    updatedBy : number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'deletedBy' })
    deletedBy : number;
  
    @DeleteDateColumn()
    deletedAt: Date;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}