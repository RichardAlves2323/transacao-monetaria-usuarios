import { User } from 'src/domain/entities/user.entity';
import { UserTypeOrm } from 'src/infrastructure/database/models/user.orm-entity';
import { UserRepositoryByTypeOrm } from 'src/infrastructure/database/repositories/user.repository.by-typeorm';
import { DataSource, QueryFailedError } from 'typeorm';

describe('UserRepository (TypeORM)', () => {
  let dataSource: DataSource;
  let userRepository: UserRepositoryByTypeOrm;

  beforeAll(async () => {
    dataSource = new DataSource({
      type: 'sqlite',
      database: ':memory',
      entities: [UserTypeOrm],
      synchronize: true,
    });
    await dataSource.initialize();

    userRepository = new UserRepositoryByTypeOrm(
      dataSource.getRepository(UserTypeOrm),
    );
  });

  beforeEach(async () => {
    await dataSource.getRepository(UserTypeOrm).clear();
  });
  afterAll(async () => {
    await dataSource.destroy();
  });

  it('deve ser possivel salvar um usuário', async () => {
    const user = new User('test', '12345678', '01-01-1980');

    const savedUser = await userRepository.save(user);

    expect(savedUser).toHaveProperty('_id');
    expect(savedUser.getUserName()).toBe(user.getUserName());
  });

  it('não deve ser possivel cadastrar um usúario com um username já cadastrado', async () => {
    await userRepository.save(new User('test', '12345678', '01-01-1980'));

    await expect(
      userRepository.save(new User('test', '87654321', '02-02-1980')),
    ).rejects.toThrow(QueryFailedError);
  });

  it('deve ser possivel listar todos os usuários', async () => {
    await userRepository.save(new User('test', '12345678', '01-01-1980'));
    await userRepository.save(new User('test2', '12345678', '01-01-1990'));

    const users = await userRepository.findAll();

    expect(users.length).toBe(2);
  });

  it('deve ser possivel encontrar usuário pelo id', async () => {
    const savedUser = await userRepository.save(
      new User('test', '12345678', '01-01-1980'),
    );

    const user = await userRepository.findById(savedUser.getId()!);

    expect(user).not.toBeNull();
    expect(user?.getUserName()).toBe('test');
  });

  it('deve ser possivel encontrar usuário pelo username', async () => {
    const savedUser = await userRepository.save(
      new User('test', '12345678', '01-01-1980'),
    );

    const user = await userRepository.findByUsername(savedUser.getUserName());

    expect(user).not.toBeNull();
    expect(user?.getUserName()).toBe('test');
  });

  it('deve ser possivel atualizar um usuário', async () => {
    const user = await userRepository.save(
      new User('test', '12345678', '01-01-1980'),
    );
    user.setUserName('testUpdate');

    const updatedUser = await userRepository.update(user);

    expect(updatedUser.getUserName()).toBe('testUpdate');
  });
});
