import { IUserUseCase } from 'src/domain/interfaces/usecases/user.usecase.interface';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UserDTO } from '../dto/user.dto';

export class UserService {
  private readonly userUseCase: IUserUseCase;

  constructor(userUserCase: IUserUseCase) {
    this.userUseCase = userUserCase;
  }

  public async create(createUserDTO: CreateUserDTO): Promise<string> {
    const user = CreateUserDTO.toDomain(createUserDTO);

    return await this.userUseCase.create(user);
  }

  public async findAll(): Promise<UserDTO[]> {
    const users = await this.userUseCase.findAll();

    return users.map((user) => UserDTO.fromDomain(user));
  }

  public async findById(id: string): Promise<UserDTO> {
    const user = await this.userUseCase.findById(id);

    return UserDTO.fromDomain(user);
  }

  public async findByUsername(username: string): Promise<UserDTO> {
    const user = await this.userUseCase.findByUsername(username);

    return UserDTO.fromDomain(user);
  }
}
