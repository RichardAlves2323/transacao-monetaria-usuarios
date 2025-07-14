import { Transfer } from '../entities/transfer.entity';
import { SameUserError } from '../errors/same-user.error';
import { TransferRepository } from '../repositories/transfer.repository';
import { ITransferUseCase } from '../interfaces/usecases/transfer.usecase.interface';
import { IUserUseCase } from '../interfaces/usecases/user.usecase.interface';

export class TransferUseCase implements ITransferUseCase {
  private readonly transferRepository: TransferRepository;
  private readonly userUseCase: IUserUseCase;

  constructor(
    transferRepository: TransferRepository,
    userUseCase: IUserUseCase,
  ) {
    this.transferRepository = transferRepository;
    this.userUseCase = userUseCase;
  }

  public async create(transfer: Transfer): Promise<void> {
    const fromUser = await this.userUseCase.findById(transfer.getFromId());
    const toUser = await this.userUseCase.findById(transfer.getToId());

    if (fromUser.getId() === toUser.getId()) throw new SameUserError();

    fromUser.subtractFromBalance(transfer.getAmount());
    toUser.addToBalance(transfer.getAmount());

    await this.userUseCase.update(fromUser);
    await this.userUseCase.update(toUser);

    await this.transferRepository.save(transfer);
  }

  public async findAll(): Promise<Transfer[]> {
    return await this.transferRepository.findAll();
  }

  public async findByUserId(userId: string): Promise<Transfer[]> {
    return await this.transferRepository.findByUserId(userId);
  }
}
