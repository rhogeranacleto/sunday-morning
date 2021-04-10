import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { getRepository } from 'typeorm';
import { Bank } from '../../src/modules/bank/banck.entity';
import { FavoredModule } from '../../src/modules/favored/favored.module';
import { FavoredBuilder } from '../../src/modules/favored/specs/favored.builder';
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
    const bank = await getRepository(Bank).findOneOrFail();

    const payload = FavoredBuilder.build({ bank });

    const { body } = await request(app.getHttpServer())
      .post('/favored')
      .send(payload)
      .expect(201);

    expect(body).toMatchObject(payload);
  });

  afterAll(async () => {
    await app.close();
  });
});
