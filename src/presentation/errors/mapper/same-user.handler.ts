import { AbstractHttpErrorHandler } from './abstract.handler';
import { BadRequestException } from '@nestjs/common';
import { SameUserError } from 'src/domain/errors/same-user.error';

export class SameUserHandler extends AbstractHttpErrorHandler {
  protected handleError(error: unknown) {
    if (error instanceof SameUserError) {
      return new BadRequestException(error.message);
    }
    return undefined;
  }
}
