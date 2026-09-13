import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from './common/config/env.validation';
import { DatabaseModule } from './infrastructure/database/database.module';
import { RedisModule } from './infrastructure/redis/redis.module';
import { StorageModule } from './infrastructure/storage/storage.module';
import { HealthModule } from './modules/health/health.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // pnpm executes this workspace with apps/api as cwd. Keep optional local
      // overrides while loading the shared monorepo environment by default.
      envFilePath: ['.env.local', '.env', '../../.env.local', '../../.env'],
      validationSchema: envValidationSchema,
    }),
    DatabaseModule,
    RedisModule,
    StorageModule,
    HealthModule,
  ],
})
export class AppModule {}
