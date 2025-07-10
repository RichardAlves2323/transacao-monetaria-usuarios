import { Injectable } from '@nestjs/common';
import { UserUseCase } from 'src/domain/services/user.usecase';
import { CreateUserDTO } from '../dto/create-user.dto';
import { User } from 'src/domain/entities/user.entity';
import { UserDTO } from '../dto/user.dto';

@Injectable()
export class UserService {
  private readonly userUseCase: UserUseCase;

  constructor(userUserCase: UserUseCase) {
    this.userUseCase = userUserCase;
  }

  public async create(createUserDTO: CreateUserDTO): Promise<string> {
    const user: User = CreateUserDTO.toDomain(createUserDTO);

    return await this.userUseCase.create(user);
  }

  public async findAll(): Promise<UserDTO[]> {
    const users: User[] = await this.userUseCase.findAll();

    return users.map((user) => UserDTO.fromDomain(user));
  }

  public async findById(id: string): Promise<UserDTO | null> {
    const user: User | null = await this.userUseCase.findById(id);

    if (user) {
      return UserDTO.fromDomain(user);
    }

    return null;
  }

  public async findByUsername(username: string): Promise<UserDTO | null> {
    const user: User | null = await this.userUseCase.findByUsername(username);

    if (user) {
      return UserDTO.fromDomain(user);
    }

    return null;
  }
}
