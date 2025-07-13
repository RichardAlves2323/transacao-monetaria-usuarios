export class InvalidUserError extends Error {
  constructor(message: string = 'Usuário ou senha invalido') {
    super(message);
  }
}
