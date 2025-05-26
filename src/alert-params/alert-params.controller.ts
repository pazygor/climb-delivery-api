import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlertParamsService } from './alert-params.service';
import { CreateAlertParamDto } from './dto/create-alert-param.dto';
import { UpdateAlertParamDto } from './dto/update-alert-param.dto';

@Controller('alert-params')
export class AlertParamsController {
  constructor(private readonly alertParamsService: AlertParamsService) {}

  @Post()
  create(@Body() createAlertParamDto: CreateAlertParamDto) {
    return this.alertParamsService.create(createAlertParamDto);
  }

  @Get()
  findAll() {
    return this.alertParamsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alertParamsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlertParamDto: UpdateAlertParamDto) {
    return this.alertParamsService.update(+id, updateAlertParamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alertParamsService.remove(+id);
  }
}
