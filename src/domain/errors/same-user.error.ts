export class SameUserError extends Error {
  constructor(
    message: string = 'Não pode realizar a transferencia para o mesmo usuario',
  ) {
    super(message);
  }
}
