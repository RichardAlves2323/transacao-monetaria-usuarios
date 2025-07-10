import { Transfer } from '../entities/transfer.entity';

export interface TransferRepository {
  save(transfer: Transfer): Promise<Transfer>;
  findAll(): Promise<Transfer[]>;
  findByUserId(userId: string): Promise<Transfer[]>;
}
