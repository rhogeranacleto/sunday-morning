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
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { FavoredDTO, FavoredQueryDTO } from './favored.dto';
import { Favored } from './favored.entity';
import { BankAccountValidationPipe } from './favored.pipe';

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
        { name: ILike(`%${search}%`) },
        { cpf_cnpj: ILike(`%${search}%`) },
        { agency: ILike(`%${search}%`) },
      ],
    });
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
