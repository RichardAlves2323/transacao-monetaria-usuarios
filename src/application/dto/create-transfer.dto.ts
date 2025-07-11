import { Transfer } from 'src/domain/entities/transfer.entity';

export class CreateTransferDTO {
  fromId: string;
  toId: string;
  amount: number;

  static toDomain(createTransferDTO: CreateTransferDTO): Transfer {
    return new Transfer(
      createTransferDTO.fromId,
      createTransferDTO.toId,
      createTransferDTO.amount,
    );
  }
}
