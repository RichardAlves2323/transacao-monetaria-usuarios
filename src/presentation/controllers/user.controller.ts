import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDTO } from 'src/application/dto/create-user.dto';
import { UserService } from 'src/application/services/user.service';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt-auth.guard';
import { CreateUserSwaggerDTO } from '../dto/swagger/create-user.swagger.dto';
import { UserSwaggerDTO } from '../dto/swagger/user.swagger.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
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
