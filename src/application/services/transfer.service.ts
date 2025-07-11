import { TransferUseCase } from 'src/domain/services/transfer.usecase';
import { CreateTransferDTO } from '../dto/create-transfer.dto';

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
