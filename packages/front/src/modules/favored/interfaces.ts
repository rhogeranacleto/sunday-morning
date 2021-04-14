import { Color } from '@material-ui/lab';
import { IBank, BankAccountType } from '../bank/interfaces';

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
