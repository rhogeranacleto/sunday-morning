import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankAccountType } from './bank-account-type.enum';
import { Bank } from './bank.entity';

@Controller('bank')
export class BankController {
  constructor(
    @InjectRepository(Bank) private bankRepository: Repository<Bank>,
  ) {}

  @Get()
  public getAll(): Promise<Bank[]> {
    return this.bankRepository.find();
  }

  @Get('account-types')
  public getAccountType(): string[] {
    return Object.values(BankAccountType);
  }
}
