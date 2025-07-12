import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './user.module';
import { AuthService } from './infrastructure/auth/auth.service';
import { JwtStrategy } from './infrastructure/auth/jwt.strategy';
import { AuthController } from './presentation/controllers/auth.controller';
import { UserUseCase } from './domain/services/user.usecase';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'umaSenha',
    }),
    UserModule,
  ],
  providers: [
    {
      provide: AuthService,
      useFactory: (jwtService: JwtService, userUseCase: UserUseCase) => {
        return new AuthService(jwtService, userUseCase);
      },
      inject: [JwtService, 'IUserUseCase'],
    },
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
