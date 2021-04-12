import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  BankAccountType,
  GeneralAccountType,
} from '../bank/bank-account-type.enum';
import { Bank } from '../bank/bank.entity';

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

  @Column({ type: 'varchar' })
  public bankAccountType: BankAccountType | GeneralAccountType;

  @Column()
  public bankAccount: string;

  @Column()
  public bankAccountDigit: string;

  @Column({ default: true })
  public draft: boolean;
}
