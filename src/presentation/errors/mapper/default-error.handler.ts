import { AbstractHttpErrorHandler } from './abstract.handler';
import { InternalServerErrorException } from '@nestjs/common';

export class DefaultErrorHandler extends AbstractHttpErrorHandler {
  protected handleError(error: unknown) {
    return new InternalServerErrorException('Erro interno no servidor');
  }
}
