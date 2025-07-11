/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { buildErrorMapperChain } from './error-mapper-chain';

const errorMapper = buildErrorMapperChain();

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const httpException = errorMapper.handle(exception);

    const status = httpException!.getStatus();
    const message =
      (httpException!.getResponse() as any)?.message || httpException!.message;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: message,
    });
  }
}
