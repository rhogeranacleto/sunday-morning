import { Color } from '@material-ui/lab';

export interface IBank {
  code: string;
  name: string;
  icon: string;
}

export enum BankAccountType {
  current = 'CONTA_CORRENTE',
  savings = 'CONTA_POUPANCA',
  easy = 'CONTA_FACIL',
}

export interface IFavored {
  id?: string;
  name: string;
  cpf_cnpj: string;
  email: string;
  bank: IBank;
  agency: string;
  agencyDigit: string;
  bankAccountType: BankAccountType;
  bankAccount: string;
  bankAccountDigit: string;
  draft: boolean;
}

export interface ISnackbarData {
  text: string;
  type: Color;
}
