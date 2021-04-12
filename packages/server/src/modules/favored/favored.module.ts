import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoredControler } from './favored.controller';
import { FavoredRepository } from './favored.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FavoredRepository])],
  controllers: [FavoredControler],
})
export class FavoredModule {}
