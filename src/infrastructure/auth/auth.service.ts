import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from 'src/application/dto/login.dto';
import { IUserUseCase } from 'src/domain/usecases/user.usecase.interface';
import { InvalidUserError } from '../errors/invalid-user.error';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userUseCase: IUserUseCase,
  ) {}

  public async login(loginDTO: LoginDTO) {
    const user = await this.userUseCase.findByUsername(loginDTO.username);

    if (!user || user.getPassword() !== loginDTO.password)
      throw new InvalidUserError();

    const payload = { username: user.getUserName() };

    return {
      token: this.jwtService.sign(payload, { expiresIn: '1h' }),
      expiresIn: '1h',
    };
  }
}
