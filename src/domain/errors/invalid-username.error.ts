export class InvalidUsernameError extends Error {
  constructor(message: string = 'O username não pode ser vazio') {
    super(message);
  }
}
