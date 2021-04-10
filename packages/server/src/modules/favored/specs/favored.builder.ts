import { makeFactoryWithRequired } from 'factory.ts/lib/sync';
import { BankAccountType } from '../../bank/bank-account-type.enum';
import { Favored } from '../favored.entity';

export const FavoredBuilder = makeFactoryWithRequired<Partial<Favored>, 'bank'>(
  {
    name: 'Pedro',
    cpf_cnpj: '000.000.000-00',
    email: 'pedro@email.com',
    agency: '3444',
    bankAccountType: BankAccountType.current,
    bankAccount: '23433',
    bankAccountDigit: '2',
  },
);
