import { Module } from '@nestjs/common';
import { FavoredModule } from './favored/favored.module';

@Module({
  imports: [FavoredModule],
})
export class ApiModule {}
