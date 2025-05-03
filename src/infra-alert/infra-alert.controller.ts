import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InfraAlertService } from './infra-alert.service';
import { CreateInfraAlertDto } from './dto/create-infra-alert.dto';
import { UpdateInfraAlertDto } from './dto/update-infra-alert.dto';

@Controller('infra-alert')
export class InfraAlertController {
  constructor(private readonly infraAlertService: InfraAlertService) {}

  @Post()
  create(@Body() createInfraAlertDto: CreateInfraAlertDto) {
    return this.infraAlertService.create(createInfraAlertDto);
  }

  @Get()
  findAll() {
    return this.infraAlertService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.infraAlertService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInfraAlertDto: UpdateInfraAlertDto) {
    return this.infraAlertService.update(+id, updateInfraAlertDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.infraAlertService.remove(+id);
  }
}
