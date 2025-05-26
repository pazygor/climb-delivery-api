// src/servers/servers.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // ajuste se o caminho for diferente
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';

@Injectable()
export class ServersService {
  constructor(private readonly prisma: PrismaService) { }

  create(createServerDto: CreateServerDto) {
    return this.prisma.servidor.create({
      data: {
        ...createServerDto,
      },
    });
  }

  findAll() {
    return this.prisma.servidor.findMany();
  }

  findOne(id: number) {
    return this.prisma.servidor.findUnique({
      where: { id },
    });
  }

  update(id: number, updateServerDto: UpdateServerDto) {
    return this.prisma.servidor.update({
      where: { id },
      data: updateServerDto,
    });
  }

  remove(id: number) {
    return this.prisma.servidor.delete({
      where: { id },
    });
  }
  async getAlertDataByServer(serverId: number) {
    // Busca os usuários de alerta
    const contacts = await this.prisma.alertaUsuario.findMany({
      where: { servidorId: serverId },
    });

    // Busca os parâmetros de alerta
    const infraParameters = await this.prisma.alertaParametro.findMany({
      where: { serverId: serverId },
    });

    // Exemplo: buscar parâmetro "ativo", se você tiver uma flag como `is_active` ou algo assim
    // const activeInfraParameter = await this.prisma.alertaParametro.findFirst({
    //   where: {
    //     server_id: serverId,
    //     ativo: true, // substitua pelo campo correto se for diferente
    //   },
    // });

    return {
      success: true,
      data: {
        contacts,
        infraParameters,
      },
    };
  }
}
