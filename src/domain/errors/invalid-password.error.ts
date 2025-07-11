export class InvalidPasswordError extends Error {
  constructor(message: string = 'A senha deve ter 8 ou mais caracteres') {
    super(message);
  }
}
