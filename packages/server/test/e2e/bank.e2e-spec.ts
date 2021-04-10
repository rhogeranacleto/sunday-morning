import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
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

  afterAll(async () => {
    await app.close();
  });
});
