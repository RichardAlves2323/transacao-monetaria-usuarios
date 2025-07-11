export class DuplicateUsernameError extends Error {
  constructor(message: string = 'Username já cadastrado') {
    super(message);
  }
}
