import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { getRepository } from 'typeorm';
import { Bank } from '../../src/modules/bank/banck.entity';
import { Favored } from '../../src/modules/favored/favored.entity';
import { FavoredModule } from '../../src/modules/favored/favored.module';
import { FavoredBuilder } from '../../src/modules/favored/specs/favored.builder';
import { seed } from '../../src/seed';
import { TypeOrmModuleTest } from '../helpers/database';

describe('FavoredController (e2e)', () => {
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

  it('POST /favored', async () => {
    const bank = await getRepository(Bank).findOneOrFail();

    const payload = FavoredBuilder.build({ bank });

    const { body } = await request(app.getHttpServer())
      .post('/favored')
      .send(payload)
      .expect(201);

    expect(body).toMatchObject(payload);
  });

  it('DELETE /favored', async () => {
    const bank = await getRepository(Bank).findOneOrFail();

    const favoreds = await getRepository(Favored).save(
      FavoredBuilder.buildList(3, { bank }),
    );
    const ids = favoreds.map((favored) => favored.id);

    await request(app.getHttpServer())
      .delete('/favored')
      .query({ ids })
      .expect(200);

    await expect(getRepository(Favored).findByIds(ids)).resolves.toHaveLength(
      0,
    );
  });

  afterAll(async () => {
    await app.close();
  });
});
