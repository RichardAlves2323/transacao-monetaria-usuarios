import { InjectRepository } from '@nestjs/typeorm';
import { Transfer } from 'src/domain/entities/transfer.entity';
import { TransferRepository } from 'src/domain/repositories/transfer.repository';
import { TransferTypeOrm } from '../models/transfer.orm-entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransferRepositoryByTypeOrm implements TransferRepository {
  constructor(
    @InjectRepository(TransferTypeOrm)
    private transferRepositoryTypeOrm: Repository<TransferTypeOrm>,
  ) {}

  public async save(transfer: Transfer): Promise<Transfer> {
    const transferTypeOrm = TransferTypeOrm.fromDomain(transfer);
    const savedTransfer =
      await this.transferRepositoryTypeOrm.save(transferTypeOrm);

    return TransferTypeOrm.toDomain(savedTransfer);
  }

  public async findAll(): Promise<Transfer[]> {
    const transfers = await this.transferRepositoryTypeOrm.find();

    return transfers.map((transfer) => TransferTypeOrm.toDomain(transfer));
  }

  public async findByUserId(userId: string): Promise<Transfer[]> {
    const transfers = await this.transferRepositoryTypeOrm.find({
      where: [{ fromId: userId }, { toId: userId }],
    });

    return transfers.map((transfer) => TransferTypeOrm.toDomain(transfer));
  }
}
