import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import type { Request, Response } from 'express';
import { randomUUID } from 'node:crypto';
import { Observable, tap } from 'rxjs';
@Injectable()
export class RequestLogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest<Request & { requestId?: string }>();
    const res = context.switchToHttp().getResponse<Response>();
    const requestId = req.headers['x-request-id']?.toString() || randomUUID();
    req.requestId = requestId;
    res.setHeader('x-request-id', requestId);
    const start = performance.now();
    const log = (level: 'info' | 'error') =>
      console.log(
        JSON.stringify({
          timestamp: new Date().toISOString(),
          level,
          requestId,
          method: req.method,
          path: req.path,
          statusCode: res.statusCode,
          responseTime: Math.round(performance.now() - start),
        }),
      );
    return next.handle().pipe(tap({ next: () => log('info'), error: () => log('error') }));
  }
}
