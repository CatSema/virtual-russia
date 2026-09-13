import { Injectable } from '@nestjs/common';
import type { HealthResponse, ServiceState } from '@virtual-russia/contracts' with {
  'resolution-mode': 'require',
};
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { RedisService } from '../../infrastructure/redis/redis.service';
import { StorageService } from '../../infrastructure/storage/storage.service';
@Injectable()
export class HealthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    private readonly storage: StorageService,
  ) {}
  async getHealth(): Promise<HealthResponse> {
    const check = async (fn: () => Promise<boolean>): Promise<ServiceState> => {
      try {
        return (await fn()) ? 'up' : 'down';
      } catch {
        return 'down';
      }
    };
    const [database, redis, storage] = await Promise.all([
      check(() => this.prisma.checkHealth()),
      check(() => this.redis.checkHealth()),
      check(() => this.storage.checkHealth()),
    ]);
    return {
      status: [database, redis, storage].every((service) => service === 'up') ? 'ok' : 'degraded',
      services: { api: 'up', database, redis, storage },
    };
  }
}
