import * as faker from 'faker';
import { getRepository } from 'typeorm';
import { Bank } from './modules/bank/bank.entity';
import { Favored } from './modules/favored/favored.entity';
import { FavoredBuilder } from './modules/favored/specs/favored.builder';

export const seed = async (): Promise<void> => {
  const banks = await getRepository(Bank).save([
    {
      code: '237',
      name: 'Bradesco',
      icon:
        'https://bandnewscwb.b-cdn.net/band/wp-content/uploads/2019/05/BRADESCO-LOGO.png',
    },
    {
      code: '104',
      name: 'Caixa Econômica Federal',
      icon:
        'http://vemmorarmais.com.br/wp-content/uploads/2019/01/ico_1-02.png',
    },
    {
      code: '756',
      name: 'Sicoob',
      icon:
        'https://pbs.twimg.com/profile_images/1096046807824646144/JKE5Mlhu.png',
    },
    {
      code: '001',
      name: 'Banco do Brasil',
      icon: 'https://image.flaticon.com/icons/png/512/195/195488.png',
    },
  ]);

  await getRepository(Favored).save(
    new Array(30)
      .fill(new Favored())
      .map(() =>
        FavoredBuilder.build({ bank: faker.random.arrayElement(banks) }),
      ),
  );
};
