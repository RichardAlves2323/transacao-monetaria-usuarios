import { User } from '../entities/user.entity';
import { DuplicateUsernameError } from '../errors/duplicate-username.error';
import { UserNotFoundError } from '../errors/user-not-found.error';
import { UserRepository } from '../repositories/user.repository';
import { IUserUseCase } from '../usecases/user.usecase.interface';

export class UserUseCase implements IUserUseCase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async create(user: User): Promise<string> {
    const existUser = await this.userRepository.findByUsername(
      user.getUserName(),
    );

    if (existUser) throw new DuplicateUsernameError();

    const newUser: User = await this.userRepository.save(user);

    return newUser.getId()!;
  }

  public async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  public async findById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (user) return user;

    throw new UserNotFoundError();
  }

  public async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findByUsername(username);

    if (user) return user;

    throw new UserNotFoundError();
  }

  public async update(user: User): Promise<User> {
    return await this.userRepository.update(user);
  }
}
