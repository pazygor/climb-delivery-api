import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AppAlertService } from './app-alert.service';
import { CreateAppAlertDto } from './dto/create-app-alert.dto';
import { UpdateAppAlertDto } from './dto/update-app-alert.dto';

@Controller('app-alert')
export class AppAlertController {
  constructor(private readonly appAlertService: AppAlertService) {}

  @Post()
  create(@Body() createAppAlertDto: CreateAppAlertDto) {
    return this.appAlertService.create(createAppAlertDto);
  }

  @Get()
  findAll() {
    return this.appAlertService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appAlertService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppAlertDto: UpdateAppAlertDto) {
    return this.appAlertService.update(+id, updateAppAlertDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appAlertService.remove(+id);
  }
}
