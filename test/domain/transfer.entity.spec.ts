import { Transfer } from 'src/domain/entities/transfer.entity';
import { InvalidTransferValueError } from 'src/domain/errors/invalid-transfer-value.error';

describe('Transfer', () => {
  it('não deve ser possivel criar uma transferencia com o valor negativo', () => {
    expect(() => new Transfer('1', '2', -100)).toThrow(
      InvalidTransferValueError,
    );
  });
});
