import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;
    
    @Column()
    dateOfBirth: Date;
    
    @Column()
    gender: string;
    
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

    @Column({nullable:true}) 
    updateby:number;

    @Column({nullable:true}) 
    deletedBy:number;

    @DeleteDateColumn() 
    deletedAt:Date;

    @UpdateDateColumn() 
    updatedAt:Date;
    
    @CreateDateColumn() 
    createdAt:Date;
  
}