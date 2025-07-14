import { User } from 'src/domain/entities/user.entity';

export interface IUserUseCase {
  create(user: User): Promise<string>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User>;
  findByUsername(username: string): Promise<User>;
  update(user: User): Promise<User>;
}
