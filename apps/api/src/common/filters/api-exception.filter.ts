import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import type { Request, Response } from 'express';
@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request & { requestId?: string }>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const body = exception instanceof HttpException ? exception.getResponse() : undefined;
    const details =
      typeof body === 'object' && body && 'message' in body && Array.isArray(body.message)
        ? body.message
        : [];
    const message =
      status === 500
        ? 'Internal server error'
        : typeof body === 'object' && body && 'message' in body && typeof body.message === 'string'
          ? body.message
          : 'Request validation failed';
    response.status(status).json({
      statusCode: status,
      code: status === 400 ? 'VALIDATION_ERROR' : status === 500 ? 'INTERNAL_ERROR' : 'HTTP_ERROR',
      message,
      details,
      requestId: request.requestId,
    });
  }
}
