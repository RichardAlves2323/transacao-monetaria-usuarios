import { Transfer } from '../entities/transfer.entity';
import { User } from '../entities/user.entity';
import { SameUserError } from '../errors/same-user.error';
import { TransferRepository } from '../repositories/transfer.repository';
import { UserUseCase } from './user.usecase';

export class TransferUseCase {
  private transferRepository: TransferRepository;
  private userUseCase: UserUseCase;

  constructor(
    transferRepository: TransferRepository,
    userUseCase: UserUseCase,
  ) {
    this.transferRepository = transferRepository;
    this.userUseCase = userUseCase;
  }

  public async create(transfer: Transfer): Promise<void> {
    const fromUser = await this.userUseCase.findById(transfer.getFromId());
    const toUser = await this.userUseCase.findById(transfer.getToId());

    if (this.checkSameUser(fromUser, toUser)) {
      fromUser.subtractFromBalance(transfer.getAmount());
      toUser.addToBalance(transfer.getAmount());

      await this.userUseCase.update(fromUser);
      await this.userUseCase.update(toUser);

      await this.transferRepository.save(transfer);
    }
  }

  private checkSameUser(fromUser: User, toUser: User): boolean {
    if (fromUser.getId() === toUser.getId()) throw new SameUserError();

    return true;
  }

  public async findAll(): Promise<Transfer[]> {
    return await this.transferRepository.findAll();
  }

  public async findByUserId(userId: string): Promise<Transfer[]> {
    return await this.transferRepository.findByUserId(userId);
  }
}
