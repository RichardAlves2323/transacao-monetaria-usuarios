import { AbstractHttpErrorHandler } from './abstract.handler';
import { BadRequestException } from '@nestjs/common';
import { DuplicateUsernameError } from 'src/domain/errors/duplicate-username.error';

export class DuplicateUsernameHandler extends AbstractHttpErrorHandler {
  protected handleError(error: unknown) {
    if (error instanceof DuplicateUsernameError) {
      return new BadRequestException(error.message);
    }
    return undefined;
  }
}
