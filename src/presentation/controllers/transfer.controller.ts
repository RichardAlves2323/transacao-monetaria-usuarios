import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTransferDTO } from 'src/application/dto/create-transfer.dto';
import { TransferService } from 'src/application/services/transfer.service';

@ApiTags('transfers')
@Controller('transfers')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post()
  @ApiOperation({ summary: 'Create transfer' })
  public async create(@Body() createTransferDTO: CreateTransferDTO) {
    return await this.transferService.create(createTransferDTO);
  }
}
