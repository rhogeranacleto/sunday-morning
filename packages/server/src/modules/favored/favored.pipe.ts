import { PipeTransform, UnprocessableEntityException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import {
  BancoDoBrasilAccountDTO,
  FavoredDTO,
  GenericBankDTO,
} from './favored.dto';

export class BankAccountValidationPipe implements PipeTransform {
  public async transform(value: FavoredDTO): Promise<FavoredDTO> {
    const validateClass =
      value.bank.code === '001' ? BancoDoBrasilAccountDTO : GenericBankDTO;

    const payload = plainToClass(validateClass, value);
    const errors = await validate(payload);

    if (errors.length) {
      throw new UnprocessableEntityException(errors);
    }

    return value;
  }
}
