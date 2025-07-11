import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { LoginDTO } from 'src/application/dto/login.dto';
import { AuthService } from 'src/infrastructure/auth/auth.service';
import { LoginSwaggerDTO } from '../dto/swagger/login.swagger.dto';

@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @ApiBody({ type: LoginSwaggerDTO })
  @ApiResponse({
    status: 200,
    description: 'Autenticação de usuário realizada com sucesso',
  })
  public async login(@Body() loginDTO: LoginDTO, @Res() response: Response) {
    const token = await this.authService.login(loginDTO);

    return response.status(200).json(token).send();
  }
}
