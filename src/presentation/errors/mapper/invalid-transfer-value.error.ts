import { AbstractHttpErrorHandler } from './abstract.handler';
import { BadRequestException } from '@nestjs/common';
import { InvalidTransferValueError } from 'src/domain/errors/invalid-transfer-value.error';

export class InvalidTransferValueHandler extends AbstractHttpErrorHandler {
  protected handleError(error: unknown) {
    if (error instanceof InvalidTransferValueError) {
      return new BadRequestException(error.message);
    }
    return undefined;
  }
}
