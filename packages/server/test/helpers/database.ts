import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions, getConnectionOptions } from 'typeorm';
import * as path from 'path';
import { NamingStrategyService } from '../../src/core/database/naming-strategy.service';

export const getTestConnectionOptions = async (): Promise<ConnectionOptions> => {
  const options = await getConnectionOptions('test');

  return {
    ...options,
    name: undefined,
    dropSchema: true,
    namingStrategy: new NamingStrategyService('custom-naming-strategy'),
    entities: [path.join(process.cwd(), './src/**/**.entity.ts')],
  };
};

export const TypeOrmModuleTest = TypeOrmModule.forRootAsync({
  useFactory: getTestConnectionOptions,
});
