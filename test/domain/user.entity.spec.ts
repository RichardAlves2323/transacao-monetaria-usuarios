import { User } from 'src/domain/entities/user.entity';
import { InvalidPasswordError } from 'src/domain/errors/invalid-password.error';
import { InvalidTransferValueError } from 'src/domain/errors/invalid-transfer-value.error';
import { InvalidUsernameError } from 'src/domain/errors/invalid-username.error';

describe('User', () => {
  it('não deve ser possivel criar usuario com o username vazio', () => {
    expect(() => new User(' ', '12345678', '07-23-1999')).toThrow(
      InvalidUsernameError,
    );
  });

  it('não deve ser possivel criar usuario com uma senha com menos de 8 caracteres', () => {
    expect(() => new User('test', '1234', '07-23-1999')).toThrow(
      InvalidPasswordError,
    );
  });

  it('não deve ser possivel transferir um valor negativo no momento de subtrair da conta', () => {
    const user = new User('test', '12345678', '07-23-1999');

    expect(() => user.subtractFromBalance(-100)).toThrow(
      InvalidTransferValueError,
    );
  });

  it('não deve ser possivel transferir um valor negativo no momento de adicionar na conta', () => {
    const user = new User('test', '12345678', '07-23-1999');

    expect(() => user.addToBalance(-100)).toThrow(InvalidTransferValueError);
  });
});
