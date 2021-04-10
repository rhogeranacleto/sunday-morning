import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoredDTO, FavoredQueryDTO } from './favored.dto';
import { Favored } from './favored.entity';

@Controller('favored')
export class FavoredControler {
  constructor(
    @InjectRepository(Favored) private favoredRepository: Repository<Favored>,
  ) {}

  @Get()
  public getAll(
    @Query() { take, search, skip }: FavoredQueryDTO,
  ): Promise<[Favored[], number]> {
    return this.favoredRepository.findAndCount({
      take,
      skip,
      where: search && [
        { name: search },
        { cpf_cnpj: search },
        { agency: search },
      ],
    });
  }

  @Get(':id')
  public getOne(@Param('id', ParseUUIDPipe) id: string): Promise<Favored> {
    return this.favoredRepository.findOneOrFail(id);
  }

  @Post()
  public create(@Body() payload: FavoredDTO): Promise<Favored> {
    return this.favoredRepository.save(payload);
  }

  @Put(':id')
  public update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: FavoredDTO,
  ): Promise<Favored> {
    return this.favoredRepository.save({ id, ...payload });
  }

  @Delete()
  public async remove(@Body('ids') ids: string[]): Promise<void> {
    const favoreds = await this.favoredRepository.findByIds(ids);

    await this.favoredRepository.remove(favoreds);
  }
}
