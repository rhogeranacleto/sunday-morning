import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoredDTO } from './favored.dto';
import { Favored } from './favored.entity';

@Controller('favored')
export class FavoredControler {
  constructor(
    @InjectRepository(Favored) private favoredRepository: Repository<Favored>,
  ) {}

  @Post()
  public create(@Body() payload: FavoredDTO): Promise<Favored> {
    return this.favoredRepository.save({
      ...payload,
      bank: {
        code: payload.bankCode,
      },
    });
  }
}
