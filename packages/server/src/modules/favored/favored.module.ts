import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoredControler } from './favored.controller';
import { Favored } from './favored.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favored])],
  controllers: [FavoredControler],
})
export class FavoredModule {}
