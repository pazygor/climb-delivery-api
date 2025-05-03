import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupAlertService } from './group-alert.service';
import { CreateGroupAlertDto } from './dto/create-group-alert.dto';
import { UpdateGroupAlertDto } from './dto/update-group-alert.dto';

@Controller('group-alert')
export class GroupAlertController {
  constructor(private readonly groupAlertService: GroupAlertService) {}

  @Post()
  create(@Body() createGroupAlertDto: CreateGroupAlertDto) {
    return this.groupAlertService.create(createGroupAlertDto);
  }

  @Get()
  findAll() {
    return this.groupAlertService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupAlertService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupAlertDto: UpdateGroupAlertDto) {
    return this.groupAlertService.update(+id, updateGroupAlertDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupAlertService.remove(+id);
  }
}
