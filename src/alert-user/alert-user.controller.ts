import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AlertUserService } from './alert-user.service';
import { CreateAlertUserDto } from './dto/create-alert-user.dto';
import { UpdateAlertUserDto } from './dto/update-alert-user.dto';

@Controller('alert-user')
export class AlertUserController {
  constructor(private readonly alertUserService: AlertUserService) {}

  @Post()
  create(@Body() createAlertUserDto: CreateAlertUserDto) {
    return this.alertUserService.create(createAlertUserDto);
  }

  @Get()
  findAll() {
    return this.alertUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alertUserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlertUserDto: UpdateAlertUserDto) {
    return this.alertUserService.update(+id, updateAlertUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alertUserService.remove(+id);
  }
}
