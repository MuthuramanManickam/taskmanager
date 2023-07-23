import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id:number;

    @Column() 
    name:string;

    @Column() 
    date:Date;

    @Column() 
    description:string;

    @Column({default:true})
    isActive:boolean;

    @Column({nullable : true}) 
    createBy:number;

    @CreateDateColumn() 
    createAt:Date;

    @Column({nullable:true}) 
    updateby:number;

    @UpdateDateColumn() 
    updateAt:Date;

    @Column({nullable:true}) 
    deleteBy:number;

    @DeleteDateColumn() 
    deleteAt:Date;

    
}

// export class User{
//     @PrimaryGeneratedColumn()
//     userid:number;

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
