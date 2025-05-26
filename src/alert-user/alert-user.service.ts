import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // ajuste se o caminho for diferente
import { CreateAlertUserDto } from './dto/create-alert-user.dto';
import { UpdateAlertUserDto } from './dto/update-alert-user.dto';

@Injectable()
export class AlertUserService {
  constructor(private readonly prisma: PrismaService) { }
   async findAll() {
    return this.prisma.alertaUsuario.findMany();
  }

  async findOne(id: number) {
    return this.prisma.alertaUsuario.findUnique({
      where: { id },
    });
  }

  async findByServerId(serverId: number) {
    return this.prisma.alertaUsuario.findMany({
      where: {
        servidorId: serverId,
      },
    });
  }

  async create(createAlertUserDto: CreateAlertUserDto) {
    return this.prisma.alertaUsuario.create({
      data: createAlertUserDto,
    });
  }

  async update(id: number, updateAlertUserDto: UpdateAlertUserDto) {
    return this.prisma.alertaUsuario.update({
      where: { id },
      data: updateAlertUserDto,
    });
  }

  async remove(id: number) {
    return this.prisma.alertaUsuario.delete({
      where: { id },
    });
  }
}
