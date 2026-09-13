import { HealthService } from './health.service';
describe('HealthService', () => {
  it('reports degraded when an infrastructure service fails', async () => {
    const service = new HealthService(
      { checkHealth: jest.fn().mockResolvedValue(true) } as never,
      { checkHealth: jest.fn().mockRejectedValue(new Error('offline')) } as never,
      { checkHealth: jest.fn().mockResolvedValue(true) } as never,
    );
    await expect(service.getHealth()).resolves.toEqual({
      status: 'degraded',
      services: { api: 'up', database: 'up', redis: 'down', storage: 'up' },
    });
  });
});
