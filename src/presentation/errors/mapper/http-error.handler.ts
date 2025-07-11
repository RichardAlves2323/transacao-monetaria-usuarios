import { HttpException } from '@nestjs/common';

export interface HttpErrorHandler {
  setNext(handler: HttpErrorHandler): HttpErrorHandler;
  handle(error: unknown): HttpException | undefined;
}
