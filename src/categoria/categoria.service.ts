import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCategoriaDto: CreateCategoriaDto) {
    return this.prisma.categoria.create({
      data: createCategoriaDto,
    });
  }

  findAll() {
    return this.prisma.categoria.findMany({
      include: {
        empresa: {
          select: {
            id: true,
            nomeFantasia: true,
            razaoSocial: true,
          },
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

  findByEmpresa(empresaId: number) {
    return this.prisma.categoria.findMany({
      where: { empresaId },
      include: {
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
    return this.prisma.categoria.findUnique({
      where: { id },
      include: {
        produtos: true,
      },
    });
  }

  update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return this.prisma.categoria.update({
      where: { id },
      data: updateCategoriaDto,
    });
  }

  remove(id: number) {
    return this.prisma.categoria.delete({
      where: { id },
    });
  }
}
