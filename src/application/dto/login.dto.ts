import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @ApiProperty({ example: 'user123', description: 'Username do usuario' })
  username: string;

  @ApiProperty({ example: '12345678', description: 'Senha do usuário' })
  password: string;
}
