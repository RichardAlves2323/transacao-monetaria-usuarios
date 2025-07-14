import { User } from 'src/domain/entities/user.entity';
import { DuplicateUsernameError } from 'src/domain/errors/duplicate-username.error';
import { UserNotFoundError } from 'src/domain/errors/user-not-found.error';
import { UserUseCase } from 'src/domain/services/user.usecase';

describe('UserUseCase', () => {
  let userUseCase: UserUseCase;

  const userRepositoryMock = {
    save: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    findByUsername: jest.fn(),
    update: jest.fn(),
  };

  const hasherMock = {
    hash: jest.fn(),
    compare: jest.fn(),
  };

  beforeEach(() => {
    userUseCase = new UserUseCase(userRepositoryMock, hasherMock);
  });

  it('deve ser possiver criar um novo usuário', async () => {
    const newUser = new User('test', '12345678', '07-23-1999');

    hasherMock.hash.mockResolvedValue('passwordHashed');

    userRepositoryMock.save.mockResolvedValueOnce(
      new User('test', '12345678', '07-23-1999', 0, '1'),
    );
    const userId = await userUseCase.create(newUser);

    expect(userId).toBe('1');
  });

  it('não deve ser possivel criar um novo usuário com um username já cadastrado', async () => {
    const existingUser = new User('test', '12345678', '01-01-1999');
    userRepositoryMock.findByUsername.mockResolvedValue(existingUser);

    await expect(
      userUseCase.create(new User('test', '87654321', '02-02-1999')),
    ).rejects.toThrow(DuplicateUsernameError);
  });

  it('deve ser possivel listar todos os usuarios', async () => {
    const users = [
      new User('test1', '123456789', '01-01-1900', 0, '1'),
      new User('test2', '123456789', '02-01-1900', 0, '2'),
    ];
    userRepositoryMock.findAll.mockResolvedValue(users);

    const resultUsers = await userUseCase.findAll();

    expect(resultUsers).toEqual(users);
  });

  it('deve ser possivel encontrar usuário pelo username', async () => {
    const user = new User('test', '12345678', '01-01-1900', 0, '1');

    userRepositoryMock.findByUsername.mockResolvedValue(user);

    const userByUsername = await userUseCase.findByUsername('test');

    expect(userByUsername).toEqual(user);
  });

  it('deve retornar um error de usuario não encontrado se o usuário não for encontrado pelo username', async () => {
    userRepositoryMock.findByUsername.mockResolvedValue(null);

    await expect(() => userUseCase.findByUsername('test')).rejects.toThrow(
      UserNotFoundError,
    );
  });

  it('deve ser possivel encontrar usuário pelo id', async () => {
    const user = new User('test', '12345678', '01-01-1900', 0, '1');

    userRepositoryMock.findById.mockResolvedValue(user);

    const userByUsername = await userUseCase.findById('1');

    expect(userByUsername).toEqual(user);
  });

  it('deve retornar um error de usuario não encontrado se o usuário não for encontrado pelo id', async () => {
    userRepositoryMock.findById.mockResolvedValue(null);

    await expect(() => userUseCase.findById('1')).rejects.toThrow(
      UserNotFoundError,
    );
  });
});
