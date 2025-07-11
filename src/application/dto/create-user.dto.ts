import { User } from 'src/domain/entities/user.entity';

export class CreateUserDTO {
  username: string;
  password: string;
  birthdate: string;

  static toDomain(createUserDTO: CreateUserDTO): User {
    return new User(
      createUserDTO.username,
      createUserDTO.password,
      createUserDTO.birthdate,
    );
  }
}
