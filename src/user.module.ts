import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserUseCase } from './domain/services/user.usecase';
import { UserController } from './presentation/controllers/user.controller';
import { UserTypeOrm } from './infrastructure/database/models/user.orm-entity';
import { UserService } from './application/services/user.service';
import { UserRepositoryByTypeOrm } from './infrastructure/database/repositories/user.repository.by-typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeOrm])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryByTypeOrm,
    },
    {
      provide: UserUseCase,
      useFactory: (userRepository: UserRepositoryByTypeOrm) => {
        return new UserUseCase(userRepository);
      },
      inject: ['UserRepository'],
    },
  ],
  exports: [UserUseCase],
})
export class UserModule {}
