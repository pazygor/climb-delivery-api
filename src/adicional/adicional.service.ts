import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdicionalDto } from './dto/create-adicional.dto';
import { UpdateAdicionalDto } from './dto/update-adicional.dto';

@Injectable()
export class AdicionalService {
  constructor(private readonly prisma: PrismaService) {}

  create(createAdicionalDto: CreateAdicionalDto) {
    return this.prisma.adicional.create({
      data: createAdicionalDto,
    });
  }

  async createBatch(createAdicionaisDto: CreateAdicionalDto[]) {
    const results = await this.prisma.$transaction(
      createAdicionaisDto.map((dto) =>
        this.prisma.adicional.create({
          data: dto,
        }),
      ),
    );
    return results;
  }

  findAll() {
    return this.prisma.adicional.findMany({
      include: {
        grupoAdicional: {
          select: {
            id: true,
            nome: true,
            empresaId: true,
          },
        },
      },
      orderBy: {
        ordem: 'asc',
      },
    });
  }

  findByGrupo(grupoAdicionalId: number) {
    return this.prisma.adicional.findMany({
      where: { grupoAdicionalId },
      orderBy: {
        ordem: 'asc',
      },
    });
  }

  findOne(id: number) {
    return this.prisma.adicional.findUnique({
      where: { id },
      include: {
        grupoAdicional: true,
      },
    });
  }

  update(id: number, updateAdicionalDto: UpdateAdicionalDto) {
    return this.prisma.adicional.update({
      where: { id },
      data: updateAdicionalDto,
    });
  }

  remove(id: number) {
    return this.prisma.adicional.delete({
      where: { id },
    });
  }
}
