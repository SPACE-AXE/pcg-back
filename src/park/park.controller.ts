import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParkService } from './park.service';
import { CreateParkDto } from './dto/create-park.dto';
import { UpdateParkDto } from './dto/update-park.dto';

@Controller('park')
export class ParkController {
  constructor(private readonly parkService: ParkService) {}

  @Post()
  create(@Body() createParkDto: CreateParkDto) {
    return this.parkService.create(createParkDto);
  }

  @Get()
  findAll() {
    return this.parkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parkService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParkDto: UpdateParkDto) {
    return this.parkService.update(+id, updateParkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parkService.remove(+id);
  }
}
