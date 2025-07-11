export class InvalidTransferValueError extends Error {
  constructor(
    message: string = 'O valor da transferencia deve ser maior que 0',
  ) {
    super(message);
  }
}
