import { Injectable } from '@nestjs/common';
import { TransferUseCase } from 'src/domain/services/transfer.usecase';
import { CreateTransferDTO } from '../dto/create-transfer.dto';

@Injectable()
export class TransferService {
  private readonly transferUseCase: TransferUseCase;

  constructor(transferUseCase: TransferUseCase) {
    this.transferUseCase = transferUseCase;
  }

  public async create(createTransferDTO: CreateTransferDTO): Promise<void> {
    const transfer = CreateTransferDTO.toDomain(createTransferDTO);

    await this.transferUseCase.create(transfer);
  }
}
