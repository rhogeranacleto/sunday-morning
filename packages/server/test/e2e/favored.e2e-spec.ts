import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { BankAccountType } from '../../src/modules/bank/bank-account-type.enum';
import { FavoredModule } from '../../src/modules/favored/favored.module';
import { seed } from '../../src/seed';
import { TypeOrmModuleTest } from '../helpers/database';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModuleTest, FavoredModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    );

    await seed();
  });

  it('/ (POST)', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/favored')
      .send({
        name: 'Pedro',
        cpf_cnpj: '000.000.000-00',
        email: 'pedro@email.com',
        agency: 3444,
        bankCode: '237',
        bankAccountType: BankAccountType.current,
        bankAccount: 23433,
        bankAccountDigit: 2,
      })
      .expect(201);

    expect(body).toMatchObject({
      name: 'Pedro',
      cpf_cnpj: '000.000.000-00',
      email: 'pedro@email.com',
      agency: 3444,
      bank: { code: '237' },
      bankAccountType: BankAccountType.current,
      bankAccount: 23433,
      bankAccountDigit: 2,
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
