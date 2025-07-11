import { AbstractHttpErrorHandler } from './abstract.handler';
import { BadRequestException } from '@nestjs/common';
import { InvalidUsernameError } from 'src/domain/errors/invalid-username.error';

export class InvalidUsernameHandler extends AbstractHttpErrorHandler {
  protected handleError(error: unknown) {
    if (error instanceof InvalidUsernameError) {
      return new BadRequestException(error.message);
    }
    return undefined;
  }
}
