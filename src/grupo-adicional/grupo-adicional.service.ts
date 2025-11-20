import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGrupoAdicionalDto } from './dto/create-grupo-adicional.dto';
import { UpdateGrupoAdicionalDto } from './dto/update-grupo-adicional.dto';

@Injectable()
export class GrupoAdicionalService {
  constructor(private readonly prisma: PrismaService) {}

  create(createGrupoAdicionalDto: CreateGrupoAdicionalDto) {
    return this.prisma.grupoAdicional.create({
      data: createGrupoAdicionalDto,
    });
  }

  findAll() {
    return this.prisma.grupoAdicional.findMany({
      include: {
        empresa: {
          select: {
            id: true,
            nomeFantasia: true,
          },
        },
        adicionais: true,
        _count: {
          select: {
            adicionais: true,
            produtos: true,
          },
        },
      },
      orderBy: {
        ordem: 'asc',
      },
    });
  }

  findByEmpresa(empresaId: number) {
    return this.prisma.grupoAdicional.findMany({
      where: { empresaId },
      include: {
        adicionais: {
          where: { ativo: true },
          orderBy: { ordem: 'asc' },
        },
        _count: {
          select: {
            produtos: true,
          },
        },
      },
      orderBy: {
        ordem: 'asc',
      },
    });
  }

  findOne(id: number) {
    return this.prisma.grupoAdicional.findUnique({
      where: { id },
      include: {
        adicionais: {
          orderBy: { ordem: 'asc' },
        },
        produtos: {
          include: {
            produto: true,
          },
        },
      },
    });
  }

  update(id: number, updateGrupoAdicionalDto: UpdateGrupoAdicionalDto) {
    return this.prisma.grupoAdicional.update({
      where: { id },
      data: updateGrupoAdicionalDto,
    });
  }

  remove(id: number) {
    return this.prisma.grupoAdicional.delete({
      where: { id },
    });
  }
}
