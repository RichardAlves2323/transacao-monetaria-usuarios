import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDTO } from 'src/application/dto/create-user.dto';
import { UserService } from 'src/application/services/user.service';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
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
  @ApiOperation({ summary: 'List users' })
  public async findAll(@Res() response: Response) {
    const users = await this.userService.findAll();

    return response.status(200).json(users).send();
  }
}
