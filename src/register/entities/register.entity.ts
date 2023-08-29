import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({nullable:true})
    password: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: false })
    isVerified: boolean;

    @Column({nullable:true})
    createdBy : number
  
    @Column({nullable:true})
    updatedBy : number;

    @Column({nullable:true})
    deletedBy : number;
  
    @DeleteDateColumn()
    deleteAt: Date;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}

@Entity()
export class UserPassword {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Users, user => user.id)
    @JoinColumn({ name: 'userId' })
    userId: number;

    @Column({ nullable : true })
    temporaryPassword: string;

    @Column({ default: false })
    isVerified: boolean;

    @Column({ default: false })
    isForgotPassword: boolean;

    @Column({ default: 0 })
    attemptedCount: number;

    @Column({ nullable : true})
    expiredTime: string;
    
    @Column({ nullable : true})
    blockedTime: string;

    @ManyToOne(() => Users, user => user.id)
    @JoinColumn({ name: 'createdBy' })
    createdBy : number;
  
    @ManyToOne(() => Users, user => user.id)
    @JoinColumn({ name: 'updatedBy' })
    updatedBy : number;

    @ManyToOne(() => Users, user => user.id)
    @JoinColumn({ name: 'deletedBy' })
    deletedBy : number;
  
    @DeleteDateColumn()
    deleteAt: Date;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
    
}
