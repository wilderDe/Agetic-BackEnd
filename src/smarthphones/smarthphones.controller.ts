import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SmarthphonesService } from './smarthphones.service';
import { CreateSmarthphoneDto } from './dto/create-smarthphone.dto';
import { UpdateSmarthphoneDto } from './dto/update-smarthphone.dto';

@Controller('smarthphones')
export class SmarthphonesController {
  constructor(private readonly smarthphonesService: SmarthphonesService) {}

  @Post()
  create(@Body() createSmarthphoneDto: CreateSmarthphoneDto) {
    return this.smarthphonesService.create(createSmarthphoneDto);
  }

  @Get()
  findAll() {
    return this.smarthphonesService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.smarthphonesService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSmarthphoneDto: UpdateSmarthphoneDto) {
    return this.smarthphonesService.update(id, updateSmarthphoneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.smarthphonesService.remove(id);
  }
}
