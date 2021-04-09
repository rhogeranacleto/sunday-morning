import { Test } from '@nestjs/testing';
import { NamingStrategyService } from '../naming-strategy.service';
import { TypeOrmConfigService } from '../typeorm-config.service';

describe('TypeOrmConfigService', () => {
  let typeOrmConfigService: TypeOrmConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [TypeOrmConfigService],
    }).compile();

    typeOrmConfigService = module.get(TypeOrmConfigService);
  });

  it('should createTypeOrmOptions return options with naming strategy', async () => {
    await expect(typeOrmConfigService.createTypeOrmOptions()).resolves.toEqual(
      expect.objectContaining({
        namingStrategy: expect.any(NamingStrategyService),
      }),
    );
  });
});
