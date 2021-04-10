import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bank } from './banck.entity';

@Controller('bank')
export class BankController {
  constructor(
    @InjectRepository(Bank) private bankRepository: Repository<Bank>,
  ) {}

  @Get()
  public getAll(): Promise<Bank[]> {
    return this.bankRepository.find();
  }
}
