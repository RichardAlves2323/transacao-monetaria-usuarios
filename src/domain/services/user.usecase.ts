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
    return this.userRepository.findAll();
  }

  public async findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  public async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findByUsername(username);
  }
}
