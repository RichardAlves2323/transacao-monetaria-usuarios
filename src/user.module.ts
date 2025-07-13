import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserUseCase } from './domain/services/user.usecase';
import { UserController } from './presentation/controllers/user.controller';
import { UserTypeOrm } from './infrastructure/database/models/user.orm-entity';
import { UserService } from './application/services/user.service';
import { UserRepositoryByTypeOrm } from './infrastructure/database/repositories/user.repository.by-typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './infrastructure/auth/auth.service';
import { JwtStrategy } from './infrastructure/auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTypeOrm]),
    PassportModule,
    JwtModule.register({
      secret: 'umaSenha',
    }),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserRepositoryByTypeOrm,
    },
    {
      provide: 'IUserUseCase',
      useFactory: (userRepository: UserRepositoryByTypeOrm) => {
        return new UserUseCase(userRepository);
      },
      inject: ['UserRepository'],
    },
    {
      provide: UserService,
      useFactory: (userUseCase: UserUseCase) => {
        return new UserService(userUseCase);
      },
      inject: ['IUserUseCase'],
    },
    {
      provide: AuthService,
      useFactory: (jwtService: JwtService, userUseCase: UserUseCase) => {
        return new AuthService(jwtService, userUseCase);
      },
      inject: [JwtService, 'IUserUseCase'],
    },
    JwtStrategy,
  ],
  exports: ['IUserUseCase', AuthService],
})
export class UserModule {}
