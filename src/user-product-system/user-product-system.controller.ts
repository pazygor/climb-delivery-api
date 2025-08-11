import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserProductSystemService } from './user-product-system.service';
import { CreateUserProductSystemDto } from './dto/create-user-product-system.dto';
import { UpdateUserProductSystemDto } from './dto/update-user-product-system.dto';

@Controller('user-product-system')
export class UserProductSystemController {
  constructor(private readonly userProductSystemService: UserProductSystemService) {}

  @Post()
  create(@Body() createUserProductSystemDto: CreateUserProductSystemDto) {
    return this.userProductSystemService.create(createUserProductSystemDto);
  }

  @Get()
  findAll() {
    return this.userProductSystemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userProductSystemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserProductSystemDto: UpdateUserProductSystemDto) {
    return this.userProductSystemService.update(+id, updateUserProductSystemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userProductSystemService.remove(+id);
  }
}
