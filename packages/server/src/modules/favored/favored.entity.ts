import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bank } from '../bank/banck.entity';
import { BankAccountType } from '../bank/bank-account-type.enum';

@Entity()
export class Favored extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public cpf_cnpj: string;

  @Column()
  public email: string;

  @ManyToOne(() => Bank, { nullable: false, eager: true })
  public bank: Bank;

  @Column()
  public agency: string;

  @Column({ nullable: true })
  public agencyDigit?: string;

  @Column({ enum: BankAccountType })
  public bankAccountType: BankAccountType;

  @Column()
  public bankAccount: string;

  @Column()
  public bankAccountDigit: string;

  @Column({ default: true })
  public draft: boolean;
}
