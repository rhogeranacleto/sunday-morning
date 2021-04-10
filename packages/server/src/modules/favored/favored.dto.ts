import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';
import { BankAccountType } from '../bank/bank-account-type.enum';

export class FavoredDTO {
  @IsString()
  public name: string;

  @IsString()
  public cpf_cnpj: string;

  @IsString()
  public email: string;

  @IsString()
  public bankCode: string;

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