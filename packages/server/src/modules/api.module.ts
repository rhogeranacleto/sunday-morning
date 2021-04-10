import { Module } from '@nestjs/common';
import { BankModule } from './bank/bank.module';
import { FavoredModule } from './favored/favored.module';

@Module({
  imports: [FavoredModule, BankModule],
})
export class ApiModule {}
