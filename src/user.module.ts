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
import { env } from './config/environment';
import { BcryptService } from './infrastructure/cryptography/bcrypt.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTypeOrm]),
    PassportModule,
    JwtModule.register({
      secret: env.jwtSecret,
    }),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserRepositoryByTypeOrm,
    },
    {
      provide: 'IHasher',
      useClass: BcryptService,
    },
    {
      provide: 'IUserUseCase',
      useFactory: (
        userRepository: UserRepositoryByTypeOrm,
        hasher: BcryptService,
      ) => {
        return new UserUseCase(userRepository, hasher);
      },
      inject: ['UserRepository', 'IHasher'],
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
      useFactory: (
        jwtService: JwtService,
        userUseCase: UserUseCase,
        hasher: BcryptService,
      ) => {
        return new AuthService(jwtService, userUseCase, hasher);
      },
      inject: [JwtService, 'IUserUseCase', 'IHasher'],
    },
    JwtStrategy,
  ],
  exports: ['IUserUseCase', AuthService],
})
export class UserModule {}
