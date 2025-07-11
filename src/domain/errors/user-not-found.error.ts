export class UserNotFoundError extends Error {
  constructor(message: string = 'Usuario não encontrado') {
    super(message);
  }
}
