import { Transfer } from 'src/domain/entities/transfer.entity';
import { User } from 'src/domain/entities/user.entity';
import { SameUserError } from 'src/domain/errors/same-user.error';
import { TransferUseCase } from 'src/domain/services/transfer.usecase';

describe('TransferUseCase', () => {
  let transferUseCase: TransferUseCase;

  const transferRepositoryMock = {
    save: jest.fn(),
    findAll: jest.fn(),
    findByUserId: jest.fn(),
  };

  const userUseCaseMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    findByUsername: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(() => {
    transferUseCase = new TransferUseCase(
      transferRepositoryMock,
      userUseCaseMock,
    );
  });

  it('deve ser possivel realizar uma transferencia monetaria entre usuários', async () => {
    const fromUser = new User('test1', '12345678', '07-23-1999', 0, '1');
    const toUser = new User('test1', '12345678', '07-23-1999', 0, '2');

    userUseCaseMock.findById
      .mockResolvedValueOnce(fromUser)
      .mockResolvedValueOnce(toUser);

    await transferUseCase.create(new Transfer('1', '2', 100));

    expect(fromUser.getBalance()).toBe(-100);
    expect(toUser.getBalance()).toBe(100);
  });

  it('não deve ser possivel realizar uma transferencia para o mesmo usuário', async () => {
    const user = new User('test1', '12345678', '07-23-1999', 0, '1');

    userUseCaseMock.findById.mockResolvedValue(user);

    await expect(
      transferUseCase.create(new Transfer('1', '1', 100)),
    ).rejects.toThrow(SameUserError);
  });

  it('deve ser possivel apresentar todas as transferencias', async () => {
    const transfers = [
      new Transfer('1', '2', 100),
      new Transfer('2', '1', 200),
    ];

    transferRepositoryMock.findAll.mockResolvedValue(transfers);

    const foundTransfer = await transferUseCase.findAll();

    expect(foundTransfer).toEqual(transfers);
  });

  it('deve ser possivel apresentar todas as transferencias que o usuário participou', async () => {
    const transfers = [
      new Transfer('1', '2', 100),
      new Transfer('2', '1', 200),
    ];

    transferRepositoryMock.findByUserId.mockResolvedValue(transfers);

    const foundTransfer = await transferUseCase.findByUserId('1');

    expect(foundTransfer).toEqual(transfers);
  });
});
