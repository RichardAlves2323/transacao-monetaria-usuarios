import { DefaultErrorHandler } from './mapper/default-error.handler';
import { HttpErrorHandler } from './mapper/http-error.handler';
import { InvalidPasswordHandler } from './mapper/invalid-password.handler';
import { InvalidTransferValueHandler } from './mapper/invalid-transfer-value.error';
import { InvalidUsernameHandler } from './mapper/invalid-username.handler';
import { SameUserHandler } from './mapper/same-user.handler';
import { UserNotFoundHandler } from './mapper/user-not-found.handler';

export function buildErrorMapperChain(): HttpErrorHandler {
  const userNotFound = new UserNotFoundHandler();
  const sameUser = new SameUserHandler();
  const invalidUsername = new InvalidUsernameHandler();
  const invalidPassword = new InvalidPasswordHandler();
  const invalidTransferValue = new InvalidTransferValueHandler();
  const fallback = new DefaultErrorHandler();

  userNotFound
    .setNext(sameUser)
    .setNext(invalidUsername)
    .setNext(invalidPassword)
    .setNext(invalidTransferValue)
    .setNext(fallback);

  return userNotFound;
}
