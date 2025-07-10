import { Transfer } from 'src/domain/entities/transfer.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'transfers' })
export class TransferTypeOrm {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  fromId: string;

  @Column()
  toId: string;

  @Column()
  amount: number;

  static toDomain(transferTypeOrm: TransferTypeOrm): Transfer {
    return new Transfer(
      transferTypeOrm.fromId,
      transferTypeOrm.toId,
      transferTypeOrm.amount,
      transferTypeOrm.id,
    );
  }

  static fromDomain(transfer: Transfer): TransferTypeOrm {
    const transferTypeOrm = new TransferTypeOrm();
    transferTypeOrm.fromId = transfer.getFromId();
    transferTypeOrm.toId = transfer.getToId();
    transferTypeOrm.amount = transfer.getAmount();
    transferTypeOrm.id = transfer.getId();

    return transferTypeOrm;
  }
}
