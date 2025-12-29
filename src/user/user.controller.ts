import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post(':id/change-password')
  async changePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() changePasswordDto: ChangePasswordDto
  ) {
    try {
      await this.userService.changePassword(
        id,
        changePasswordDto.senhaAtual,
        changePasswordDto.novaSenha
      );
      return { message: 'Senha alterada com sucesso!' };
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao alterar senha',
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
