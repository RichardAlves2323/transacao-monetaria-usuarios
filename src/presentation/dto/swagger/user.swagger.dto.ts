import { ApiProperty } from '@nestjs/swagger';

export class UserSwaggerDTO {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  birthdate: string;

  @ApiProperty()
  balance: string;
}
