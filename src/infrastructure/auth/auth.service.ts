import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from 'src/application/dto/login.dto';
import { User } from 'src/domain/entities/user.entity';
import { IUserUseCase } from 'src/domain/usecases/user.usecase.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userUseCase: IUserUseCase,
  ) {}

  public async login(loginDTO: LoginDTO) {
    const user = await this.userUseCase.findByUsername(loginDTO.username);

    if (this.checkUser(user, loginDTO.password)) {
      const payload = { username: user.getUserName() };

      return {
        token: this.jwtService.sign(payload, { expiresIn: '1h' }),
        expiresIn: '1h',
      };
    }

    throw new Error('Autenticação falhou');
  }

  private checkUser(user: User | null, password: string): boolean {
    if (!user || user.getPassword() !== password)
      throw new Error('Username ou senha invalido');

    return true;
  }
}
