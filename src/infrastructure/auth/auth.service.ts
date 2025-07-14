import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from 'src/application/dto/login.dto';
import { IUserUseCase } from 'src/domain/interfaces/usecases/user.usecase.interface';
import { InvalidUserError } from '../errors/invalid-user.error';
import { IHasher } from 'src/domain/interfaces/cryptography/cryptography.interface';

@Injectable()
export class AuthService {
  private readonly jwtService: JwtService;
  private readonly userUseCase: IUserUseCase;
  private readonly hasher: IHasher;

  constructor(
    jwtService: JwtService,
    userUseCase: IUserUseCase,
    hasher: IHasher,
  ) {
    this.jwtService = jwtService;
    this.userUseCase = userUseCase;
    this.hasher = hasher;
  }

  public async login(loginDTO: LoginDTO) {
    const user = await this.userUseCase.findByUsername(loginDTO.username);

    const passwordCompare = await this.hasher.compare(
      loginDTO.password,
      user.getPassword(),
    );

    if (!passwordCompare) throw new InvalidUserError();

    const payload = { username: user.getUserName() };

    return {
      token: this.jwtService.sign(payload, { expiresIn: '1h' }),
      expiresIn: '1h',
    };
  }
}
