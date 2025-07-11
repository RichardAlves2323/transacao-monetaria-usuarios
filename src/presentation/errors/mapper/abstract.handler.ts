import { HttpErrorHandler } from './http-error.handler';
import { HttpException } from '@nestjs/common';

export abstract class AbstractHttpErrorHandler implements HttpErrorHandler {
  private nextHandler?: HttpErrorHandler;

  setNext(handler: HttpErrorHandler): HttpErrorHandler {
    this.nextHandler = handler;
    return handler;
  }

  handle(error: unknown): HttpException | undefined {
    const result = this.handleError(error);
    if (result) return result;
    if (this.nextHandler) return this.nextHandler.handle(error);
    return undefined;
  }

  protected abstract handleError(error: unknown): HttpException | undefined;
}
