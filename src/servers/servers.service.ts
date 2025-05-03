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
}
