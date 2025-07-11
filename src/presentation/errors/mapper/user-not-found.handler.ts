import { AbstractHttpErrorHandler } from './abstract.handler';
import { UserNotFoundError } from '../../../domain/errors/user-not-found.error';
import { NotFoundException } from '@nestjs/common';

export class UserNotFoundHandler extends AbstractHttpErrorHandler {
  protected handleError(error: unknown) {
    if (error instanceof UserNotFoundError) {
      return new NotFoundException(error.message);
    }
    return undefined;
  }
}
