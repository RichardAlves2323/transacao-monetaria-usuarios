import { ApiProperty } from '@nestjs/swagger';

export class CreateUserSwaggerDTO {
  @ApiProperty({ example: 'Richard', description: 'Nome do usuário' })
  username: string;

  @ApiProperty({ example: 'umaSenha', description: 'Senha do usuário' })
  password: string;

  @ApiProperty({
    example: '07-23-1999',
    description: 'Data de nascimento do usuário',
  })
  birthdate: string;
}
