import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMonitorDto } from './dto/create-monitor.dto';
import { UpdateMonitorDto } from './dto/update-monitor.dto';

@Injectable()
export class MonitorService {
  constructor(private prisma: PrismaService) { }
  async create(dto: CreateMonitorDto) {
    return this.prisma.monitoramento.create({
      data: {
        empresa_id: dto.empresa_id,
        nome_monitoramento: dto.nome_monitoramento,
        produto: dto.produto,
        projetos: dto.projetos, // Prisma já aceita objeto JS para JSON
        servidores: dto.servidores,
      },
    });
  }
  async findAllByEmpresa(empresaId: number) {
    return this.prisma.monitoramento.findMany({
      where: { empresa_id: empresaId },
    });
  }

  async findOne(id: number) {
    const monitoramento = await this.prisma.monitoramento.findUnique({
      where: { id },
    });
    if (!monitoramento) {
      throw new NotFoundException(`Monitoramento com ID ${id} não encontrado`);
    }
    return monitoramento;
  }

  async update(id: number, dto: UpdateMonitorDto) {
    // verifica se existe
    await this.findOne(id);

    return this.prisma.monitoramento.update({
      where: { id },
      data: {
        nome_monitoramento: dto.nome_monitoramento,
        produto: dto.produto,
        projetos: dto.projetos,
        servidores: dto.servidores,
        status: dto.status,
      },
    });
  }

  async remove(id: number) {
    // verifica se existe
    await this.findOne(id);

    return this.prisma.monitoramento.delete({
      where: { id },
    });
  }
  async getMonitoramentosPorUsuario(usuarioId: number) {
    const empresa = await this.prisma.usuario.findUnique({
      where: { id: usuarioId },
      select: { empresa: true },
    });
  
    if (!empresa) {
      throw new NotFoundException(`Usuário com id ${usuarioId} não encontrado.`);
    }
    //return empresa;
    const empresa_id = empresa.empresa.id;
    return this.prisma.monitoramento.findMany({
      where: { empresa_id: empresa_id },
    });
  }
}
