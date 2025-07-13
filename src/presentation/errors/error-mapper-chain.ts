import { DefaultErrorHandler } from './mapper/default-error.handler';
import { DuplicateUsernameHandler } from './mapper/duplicate-username.handler';
import { HttpErrorHandler } from './mapper/http-error.handler';
import { InvalidPasswordHandler } from './mapper/invalid-password.handler';
import { InvalidTransferValueHandler } from './mapper/invalid-transfer-value.error';
import { InvalidUserHandler } from './mapper/invalid-user.handler';
import { InvalidUsernameHandler } from './mapper/invalid-username.handler';
import { SameUserHandler } from './mapper/same-user.handler';
import { UserNotAuthenticatedHandler } from './mapper/user-not-authenticated.handler';
import { UserNotFoundHandler } from './mapper/user-not-found.handler';

export function buildErrorMapperChain(): HttpErrorHandler {
  const userNotFound = new UserNotFoundHandler();
  const sameUser = new SameUserHandler();
  const duplicateUsername = new DuplicateUsernameHandler();
  const invalidUsername = new InvalidUsernameHandler();
  const invalidPassword = new InvalidPasswordHandler();
  const userNotAuthenticated = new UserNotAuthenticatedHandler();
  const invalidUser = new InvalidUserHandler();
  const invalidTransferValue = new InvalidTransferValueHandler();
  const fallback = new DefaultErrorHandler();

  userNotFound
    .setNext(sameUser)
    .setNext(invalidUsername)
    .setNext(duplicateUsername)
    .setNext(invalidPassword)
    .setNext(userNotAuthenticated)
    .setNext(invalidUser)
    .setNext(invalidTransferValue)
    .setNext(fallback);

  return userNotFound;
}
