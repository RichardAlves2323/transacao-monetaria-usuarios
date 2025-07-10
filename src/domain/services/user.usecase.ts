import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

export class UserUseCase {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async create(user: User): Promise<string> {
    const newUser: User = await this.userRepository.save(user);

    return newUser.getId()!;
  }

  public async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  public async findById(id: string): Promise<User | null> {
    return await this.userRepository.findById(id);
  }

  public async findByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findByUsername(username);
  }

  public async update(user: User): Promise<User> {
    return await this.userRepository.update(user);
  }
}
