import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { BankAccountType } from '../bank/bank-account-type.enum';

class BankDTO {
  @IsString()
  public code: string;
}

export class FavoredDTO {
  @IsString()
  public name: string;

  @IsString()
  public cpf_cnpj: string;

  @IsString()
  public email: string;

  @ValidateNested()
  public bank: BankDTO;

  @IsString()
  @MaxLength(4)
  @Matches(/^(?:^0*)[1-9][0-9]{0,3}$/)
  public agency: string;

  @IsString()
  @IsOptional()
  @Matches(/^[xX0-9]{0,1}$/)
  public agencyDigit: string;

  @IsEnum(BankAccountType)
  public bankAccountType: BankAccountType;

  @IsString()
  public bankAccount: string;

  @IsString()
  public bankAccountDigit: string;

  @IsBoolean()
  @IsOptional()
  public draft: boolean;
}

export class FavoredQueryDTO {
  @IsNumber()
  public skip = 0;

  @IsNumber()
  public take = 10;

  @IsString()
  @IsOptional()
  public search?: string;
}
