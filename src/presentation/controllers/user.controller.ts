import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDTO } from 'src/application/dto/create-user.dto';
import { UserService } from 'src/application/services/user.service';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt-auth.guard';
import { CreateUserSwaggerDTO } from '../dto/swagger/create-user.swagger.dto';
import { UserSwaggerDTO } from '../dto/swagger/user.swagger.dto';
import { AuthService } from 'src/infrastructure/auth/auth.service';
import { LoginSwaggerDTO } from '../dto/swagger/login.swagger.dto';
import { LoginDTO } from 'src/application/dto/login.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  private readonly userService: UserService;
  private readonly authService: AuthService;

  constructor(userService: UserService, authService: AuthService) {
    this.userService = userService;
    this.authService = authService;
  }

  @Post('singup')
  @ApiBody({ type: CreateUserSwaggerDTO })
  @ApiResponse({
    status: 201,
    description: 'Id do usuário criado',
  })
  public async create(
    @Body() createUserDTO: CreateUserDTO,
    @Res() response: Response,
  ) {
    const userId = await this.userService.create(createUserDTO);

    return response.status(201).json({ id: userId }).send();
  }

  @Post('singin')
  @ApiBody({ type: LoginSwaggerDTO })
  @ApiResponse({
    status: 200,
    description: 'Autenticação de usuário realizada com sucesso',
  })
  public async login(@Body() loginDTO: LoginDTO, @Res() response: Response) {
    const token = await this.authService.login(loginDTO);

    return response.status(200).json(token).send();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth('jwt-swagger')
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários',
    type: [UserSwaggerDTO],
  })
  public async findAll(@Res() response: Response) {
    const users = await this.userService.findAll();

    return response.status(200).json(users).send();
  }
}
