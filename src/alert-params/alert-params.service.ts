import { Injectable } from '@nestjs/common';
import { CreateAlertParamDto } from './dto/create-alert-param.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateAlertParamDto } from './dto/update-alert-param.dto';

@Injectable()
export class AlertParamsService {
  constructor(private prisma: PrismaService) { }
  async findAll() {
    return this.prisma.alertaParametro.findMany();
  }

  async findOne(id: number) {
    return this.prisma.alertaParametro.findUnique({
      where: { id },
    });
  }

  async findByServerId(serverId: number) {
    return this.prisma.alertaParametro.findMany({
      where: {
        serverId: serverId,
      },
    });
  }

  async create(createAlertParamDto: CreateAlertParamDto) {
    return this.prisma.alertaParametro.create({
      data: createAlertParamDto,
    });
  }

  async update(id: number, updateAlertParamDto: UpdateAlertParamDto) {
    return this.prisma.alertaParametro.update({
      where: { id },
      data: updateAlertParamDto,
    });
  }

  async remove(id: number) {
    return this.prisma.alertaParametro.delete({
      where: { id },
    });
  }
}
