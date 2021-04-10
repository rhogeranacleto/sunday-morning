import * as faker from 'faker';
import { getRepository } from 'typeorm';
import { Bank } from './modules/bank/banck.entity';
import { Favored } from './modules/favored/favored.entity';
import { FavoredBuilder } from './modules/favored/specs/favored.builder';

export const seed = async (): Promise<void> => {
  const banks = await getRepository(Bank).save([
    { code: '237', name: 'Bradesco' },
    { code: '104', name: 'Caixa Econômica Federal' },
    { code: '756', name: 'Sicoob' },
    { code: '001', name: 'Banco do Brasil' },
  ]);

  await getRepository(Favored).save(
    FavoredBuilder.buildList(20, { bank: faker.random.arrayElement(banks) }),
  );
};
