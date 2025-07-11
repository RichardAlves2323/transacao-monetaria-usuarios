import { AbstractHttpErrorHandler } from './abstract.handler';
import { BadRequestException } from '@nestjs/common';
import { InvalidPasswordError } from 'src/domain/errors/invalid-password.error';

export class InvalidPasswordHandler extends AbstractHttpErrorHandler {
  protected handleError(error: unknown) {
    if (error instanceof InvalidPasswordError) {
      return new BadRequestException(error.message);
    }
    return undefined;
  }
}
