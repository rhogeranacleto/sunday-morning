import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { FavoredDTO, FavoredQueryDTO } from './favored.dto';
import { Favored } from './favored.entity';
import { BankAccountValidationPipe } from './favored.pipe';
import { FavoredRepository } from './favored.repository';

@Controller('favored')
export class FavoredControler {
  constructor(private favoredRepository: FavoredRepository) {}

  @Get()
  public getAll(
    @Query() querySearch: FavoredQueryDTO,
  ): Promise<[Favored[], number]> {
    return this.favoredRepository.getAll(querySearch);
  }

  @Get(':id')
  public getOne(@Param('id', ParseUUIDPipe) id: string): Promise<Favored> {
    return this.favoredRepository.findOneOrFail(id);
  }

  @Post()
  public upsert(
    @Body(BankAccountValidationPipe) payload: FavoredDTO,
  ): Promise<Favored> {
    return this.favoredRepository.save(payload);
  }

  @Delete()
  public async remove(@Body('ids') ids: string[]): Promise<void> {
    const favoreds = await this.favoredRepository.findByIds(ids);

    await this.favoredRepository.remove(favoreds);
  }
}
