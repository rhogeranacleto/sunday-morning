import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { BankAccountType } from '../../src/modules/bank/bank-account-type.enum';
import { BankModule } from '../../src/modules/bank/bank.module';
import { seed } from '../../src/seed';
import { TypeOrmModuleTest } from '../helpers/database';

describe('BankController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [TypeOrmModuleTest, BankModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();

    await seed();
  });

  it('GET /bank', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/bank')
      .expect(200);

    expect(body).toHaveLength(4);
  });

  it('GET /bank/account-types', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/bank/account-types')
      .expect(200);

    expect(body).toEqual(Object.values(BankAccountType));
  });

  afterAll(async () => {
    await app.close();
  });
});
