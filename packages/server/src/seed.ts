import { getRepository } from 'typeorm';
import { Bank } from './modules/bank/banck.entity';

export const seed = async (): Promise<void> => {
  await getRepository(Bank).save([
    { code: '237', name: 'Bradesco' },
    { code: '104', name: 'Caixa Econômica Federal' },
    { code: '756', name: 'Sicoob' },
    { code: '001', name: 'Banco do Brasil' },
  ]);
};
