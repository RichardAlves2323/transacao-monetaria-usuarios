import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserUseCase } from './domain/services/user.usecase';
import { TransferTypeOrm } from './infrastructure/database/models/transfer.orm-entity';
import { TransferController } from './presentation/controllers/transfer.controller';
import { TransferService } from './application/services/transfer.service';
import { TransferRepositoryByTypeOrm } from './infrastructure/database/repositories/transfer.repository.by-typeorm';
import { TransferUseCase } from './domain/services/transfer.usecase';
import { UserModule } from './user.module';

@Module({
  imports: [TypeOrmModule.forFeature([TransferTypeOrm]), UserModule],
  controllers: [TransferController],
  providers: [
    {
      provide: 'TransferRepository',
      useClass: TransferRepositoryByTypeOrm,
    },
    {
      provide: 'ITransferUseCase',
      useFactory: (
        transferRepository: TransferRepositoryByTypeOrm,
        userUseCase: UserUseCase,
      ) => {
        return new TransferUseCase(transferRepository, userUseCase);
      },
      inject: ['TransferRepository', 'IUserUseCase'],
    },
    {
      provide: TransferService,
      useFactory: (transferUseCase: TransferUseCase) => {
        return new TransferService(transferUseCase);
      },
      inject: ['ITransferUseCase'],
    },
  ],
})
export class TransferModule {}
