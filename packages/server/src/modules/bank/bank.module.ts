import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankController } from './bank.controller';
import { Bank } from './bank.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bank])],
  controllers: [BankController],
})
export class BankModule {}
