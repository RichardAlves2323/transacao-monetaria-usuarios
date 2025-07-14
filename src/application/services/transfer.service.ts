import { CreateTransferDTO } from '../dto/create-transfer.dto';
import { ITransferUseCase } from 'src/domain/interfaces/usecases/transfer.usecase.interface';

export class TransferService {
  private readonly transferUseCase: ITransferUseCase;

  constructor(transferUseCase: ITransferUseCase) {
    this.transferUseCase = transferUseCase;
  }

  public async create(createTransferDTO: CreateTransferDTO): Promise<void> {
    const transfer = CreateTransferDTO.toDomain(createTransferDTO);

    await this.transferUseCase.create(transfer);
  }
}
