import { Body, Controller, Delete, Post, Query } from '@nestjs/common';
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
    return this.favoredRepository.save(payload);
  }

  @Delete()
  public async remove(@Query('ids') ids: string[]): Promise<void> {
    const favoreds = await this.favoredRepository.findByIds(ids);

    await this.favoredRepository.remove(favoreds);
  }
}
