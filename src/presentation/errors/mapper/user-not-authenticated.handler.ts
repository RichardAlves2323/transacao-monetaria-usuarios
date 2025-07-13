import { AbstractHttpErrorHandler } from './abstract.handler';
import { UnauthorizedException } from '@nestjs/common';

export class UserNotAuthenticatedHandler extends AbstractHttpErrorHandler {
  protected handleError(error: unknown) {
    if (error instanceof UnauthorizedException) {
      return new UnauthorizedException('Usuário não autenticado');
    }
    return undefined;
  }
}
