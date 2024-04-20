import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ParkingTransactionService } from './parking-transaction.service';
import { CreateParkingTransactionDto } from './dto/create-parking-transaction.dto';
import { UpdateParkingTransactionDto } from './dto/update-parking-transaction.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('parking-transaction')
@ApiTags('입출차 내역')
export class ParkingTransactionController {
  constructor(
    private readonly parkingTransactionService: ParkingTransactionService,
  ) {}

  @Post()
  create(@Body() createParkingTransactionDto: CreateParkingTransactionDto) {
    return this.parkingTransactionService.create(createParkingTransactionDto);
  }

  @Get()
  findAll() {
    return this.parkingTransactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parkingTransactionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateParkingTransactionDto: UpdateParkingTransactionDto,
  ) {
    return this.parkingTransactionService.update(
      +id,
      updateParkingTransactionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parkingTransactionService.remove(+id);
  }
}
