import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from 'src/application/dto/create-user.dto';
import { UserService } from 'src/application/services/user.service';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  public async create(@Body() createUserDTO: CreateUserDTO) {
    return await this.userService.create(createUserDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth('jwt-swagger')
  @ApiOperation({ summary: 'List users' })
  public async findAll() {
    return await this.userService.findAll();
  }
}
