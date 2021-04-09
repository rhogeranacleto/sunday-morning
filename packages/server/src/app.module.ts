import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { ApiModule } from './modules/api.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CoreModule, ApiModule],
})
export class AppModule {}
