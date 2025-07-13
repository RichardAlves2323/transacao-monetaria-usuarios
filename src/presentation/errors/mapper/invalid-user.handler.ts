import { AbstractHttpErrorHandler } from './abstract.handler';
import { BadRequestException } from '@nestjs/common';
import { InvalidUserError } from 'src/infrastructure/errors/invalid-user.error';

export class InvalidUserHandler extends AbstractHttpErrorHandler {
  protected handleError(error: unknown) {
    if (error instanceof InvalidUserError) {
      return new BadRequestException(error.message);
    }
    return undefined;
  }
}
