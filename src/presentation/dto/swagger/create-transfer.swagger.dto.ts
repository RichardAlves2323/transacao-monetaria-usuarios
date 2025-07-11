import { ApiProperty } from '@nestjs/swagger';

export class CreateTransferSwaggerDTO {
  @ApiProperty({
    example: '1',
    description: 'Id do usuario que ira transferir o valor',
  })
  fromId: string;

  @ApiProperty({
    example: '2',
    description: 'Id do usuario que ira receber o valor',
  })
  toId: string;

  @ApiProperty({ example: 100, description: 'Valor da transferencia' })
  amount: number;
}
