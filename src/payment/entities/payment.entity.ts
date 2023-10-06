import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class PaymentRequest {
    @PrimaryGeneratedColumn()
    requestid: number;
  
    @Column()
    vendorname: string;
  
    @Column()
    invoicenumber: string;
  
    @Column({ type: 'date' })
    requestdate: Date;
  
    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;
  
    @ManyToOne(() => Status, (status) => status.id)
    @JoinColumn({ name: 'statusId' })
    status: number;

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

export class PaymentProcess {
  @PrimaryGeneratedColumn()
  paymentprocessid: number;

  @ManyToOne(() => Status)
  @JoinColumn({ name: 'statusid' })
  status: Status;

  @ManyToOne(() => PaymentRequest, paymentRequest => paymentRequest)
  paymentRequest: PaymentRequest;

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
