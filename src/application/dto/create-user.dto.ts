import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/domain/entities/user.entity';

export class CreateUserDTO {
  @ApiProperty({ example: 'Richard', description: 'Nome do usuário' })
  username: string;

  @ApiProperty({ example: 'umaSenha', description: 'Senha do usuário' })
  password: string;

  @ApiProperty({
    example: '07-23-1999',
    description: 'Data de nascimento do usuário',
  })
  birthdate: string;

  static toDomain(createUserDTO: CreateUserDTO): User {
    return new User(
      createUserDTO.username,
      createUserDTO.password,
      createUserDTO.birthdate,
    );
  }
}
