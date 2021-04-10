import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { getRepository } from 'typeorm';
import { Bank } from '../../src/modules/bank/banck.entity';
import { FavoredQueryDTO } from '../../src/modules/favored/favored.dto';
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

  describe('GET /favored', () => {
    const getAll = async (
      query: FavoredQueryDTO,
    ): Promise<[Favored[], number]> => {
      const { body } = await request(app.getHttpServer())
        .get('/favored')
        .query(query)
        .expect(200);

      return body;
    };

    beforeAll(async () => {
      await getRepository(Favored).delete({});

      const bank = await getRepository(Bank).findOneOrFail();

      await getRepository(Favored).save(FavoredBuilder.buildList(30, { bank }));
    });

    it('should return first 10 favoreds', async () => {
      const [favoreds] = await getAll({ skip: 0, take: 10 });

      expect(favoreds).toHaveLength(10);
    });

    it('should skip first 5 favoreds', async () => {
      const [favoreds] = await getAll({ skip: 5, take: 5 });

      const firstFiveFavored = await getRepository(Favored).find({
        take: 5,
      });

      expect.assertions(5);

      for (const favored of firstFiveFavored) {
        expect(favoreds.map((favored) => favored.id)).not.toContain(favored.id);
      }
    });

    it.each(['name', 'cpf_cnpj', 'agency'])(
      'should filter by %p',
      async (column) => {
        const record = await getRepository(Favored).findOneOrFail();

        const [[favored]] = await getAll({
          take: 1,
          skip: 0,
          search: record[column],
        });

        expect(favored).not.toBeNull();
        expect(favored[column]).toEqual(record[column]);
      },
    );
  });

  it('GET /favored/:id', async () => {
    const bank = await getRepository(Bank).findOneOrFail();

    const favored = await getRepository(Favored).save(
      FavoredBuilder.build({ bank }),
    );

    const { body } = await request(app.getHttpServer())
      .get(`/favored/${favored.id}`)
      .expect(200);

    expect(body).toMatchObject(favored);
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
