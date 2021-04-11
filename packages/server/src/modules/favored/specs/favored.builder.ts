import { each, makeFactoryWithRequired } from 'factory.ts/lib/sync';
import * as faker from 'faker';
import { BankAccountType } from '../../bank/bank-account-type.enum';
import { Favored } from '../favored.entity';

const CPF_REGEX = '[0-9][0-9][0-9].[0-9][0-9][0-9].[0-9][0-9][0-9]-[0-9][0-9]';

export const FavoredBuilder = makeFactoryWithRequired<Partial<Favored>, 'bank'>(
  {
    name: each(() => faker.name.findName()),
    cpf_cnpj: each(() => faker.helpers.regexpStyleStringParse(CPF_REGEX)),
    email: each(() => faker.internet.email()),
    agency: each(() => faker.finance.account(4)),
    agencyDigit: each(() => faker.datatype.number(9).toString()),
    bankAccountType: each(() =>
      faker.random.arrayElement(Object.values(BankAccountType)),
    ),
    bankAccount: each(() => faker.finance.account(5)),
    bankAccountDigit: each(() => faker.datatype.number(9).toString()),
    draft: each(() => faker.datatype.boolean()),
  },
);
