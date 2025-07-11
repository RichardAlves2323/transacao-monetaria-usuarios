import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateTransferDTO } from 'src/application/dto/create-transfer.dto';
import { TransferService } from 'src/application/services/transfer.service';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt-auth.guard';
import { CreateTransferSwaggerDTO } from '../dto/swagger/create-transfer.swagger.dto';

@ApiTags('transfers')
@Controller('transfers')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBody({ type: CreateTransferSwaggerDTO })
  @ApiResponse({
    status: 204,
    description: 'Transferencia realizada com sucesso',
  })
  @ApiBearerAuth('jwt-swagger')
  public async create(
    @Body() createTransferDTO: CreateTransferDTO,
    @Res() response: Response,
  ) {
    await this.transferService.create(createTransferDTO);

    return response.status(204).send();
  }
}
