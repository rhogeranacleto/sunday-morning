import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import {
  BankAccountType,
  GeneralAccountType,
} from '../bank/bank-account-type.enum';

class BankDTO {
  @IsString()
  public code: string;
}

export class FavoredDTO {
  @IsString()
  @IsOptional()
  public id: string;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public cpf_cnpj: string;

  @IsString()
  @IsNotEmpty()
  public email: string;

  @ValidateNested()
  @IsNotEmpty()
  public bank: BankDTO;

  @IsString()
  @MaxLength(4)
  @Matches(/^(?:^0*)[1-9][0-9]{0,3}$/)
  @IsNotEmpty()
  public agency: string;

  @IsString()
  @IsOptional()
  @Matches(/^[xX0-9]{0,1}$/)
  public agencyDigit: string;

  @IsNotEmpty({ always: true })
  public bankAccountType: BankAccountType;

  @IsString()
  @IsNotEmpty()
  public bankAccount: string;

  @IsString()
  @IsNotEmpty()
  public bankAccountDigit: string;

  @IsBoolean()
  @IsOptional()
  public draft: boolean;
}

export class FavoredQueryDTO {
  @IsNumberString()
  @IsOptional()
  public skip = 0;

  @IsOptional()
  @IsNumberString()
  public take = 10;

  @IsString()
  @IsOptional()
  public search?: string;
}

export class BancoDoBrasilAccountDTO {
  @MaxLength(8)
  @Matches(/^(?:^0*)[1-9][0-9]{0,7}$/)
  public bankAccount: string;

  @Matches(/^[xX0-9]{0,1}$/)
  public bankAccountDigit: string;

  @IsEnum(BankAccountType)
  public bankAccountType: BankAccountType;
}

export class GenericBankDTO {
  @MaxLength(11)
  @Matches(/^(?:^0*)[1-9][0-9]{0,10}$/)
  public bankAccount: string;

  @Matches(/^[0-9]{0,1}$/)
  public bankAccountDigit: string;

  @IsEnum(GeneralAccountType)
  public bankAccountType: BankAccountType;
}
