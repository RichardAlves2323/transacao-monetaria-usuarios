import { Transfer } from '../entities/transfer.entity';

export interface ITransferUseCase {
  create(transfer: Transfer): Promise<void>;
  findAll(): Promise<Transfer[]>;
  findByUserId(userId: string): Promise<Transfer[]>;
}
