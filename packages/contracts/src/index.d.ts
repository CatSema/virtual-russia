export type ServiceState = 'up' | 'down';

export interface HealthResponse {
  status: 'ok' | 'degraded';
  services: {
    api: ServiceState;
    database: ServiceState;
    redis: ServiceState;
    storage: ServiceState;
  };
}

export interface ApiErrorResponse {
  statusCode: number;
  code: string;
  message: string;
  details: unknown[];
  requestId?: string;
}
