import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTransferDTO } from 'src/application/dto/create-transfer.dto';
import { TransferService } from 'src/application/services/transfer.service';
import { JwtAuthGuard } from 'src/infrastructure/auth/jwt-auth.guard';

@ApiTags('transfers')
@Controller('transfers')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create transfer' })
  @ApiBearerAuth('jwt-swagger')
  public async create(@Body() createTransferDTO: CreateTransferDTO) {
    return await this.transferService.create(createTransferDTO);
  }
}
