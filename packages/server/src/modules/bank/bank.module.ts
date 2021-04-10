import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from './banck.entity';
import { BankController } from './bank.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Bank])],
  controllers: [BankController],
})
export class BankModule {}
