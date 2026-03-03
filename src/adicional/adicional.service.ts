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

  // Duplicar adicional
  async duplicate(id: number) {
    const adicionalOriginal = await this.prisma.adicional.findUnique({
      where: { id },
    });

    if (!adicionalOriginal) {
      throw new Error('Adicional não encontrado');
    }

    return this.prisma.adicional.create({
      data: {
        grupoAdicionalId: adicionalOriginal.grupoAdicionalId,
        nome: `${adicionalOriginal.nome} (Cópia)`,
        descricao: adicionalOriginal.descricao,
        preco: adicionalOriginal.preco,
        ordem: adicionalOriginal.ordem + 1,
        ativo: adicionalOriginal.ativo,
      },
    });
  }

  // Soft delete (desativar)
  async softDelete(id: number) {
    return this.prisma.adicional.update({
      where: { id },
      data: { ativo: false },
    });
  }

  // Reordenar adicionais dentro de um grupo
  async reorder(grupoId: number, ids: number[]) {
    const updates = ids.map((id, index) =>
      this.prisma.adicional.update({
        where: { id },
        data: { ordem: index },
      }),
    );

    await this.prisma.$transaction(updates);
    return { success: true };
  }

  // Atualizar múltiplos adicionais
  async updateMany(updates: Array<{ id: number; data: UpdateAdicionalDto }>) {
    const updatePromises = updates.map((update) =>
      this.prisma.adicional.update({
        where: { id: update.id },
        data: update.data,
      }),
    );

    return this.prisma.$transaction(updatePromises);
  }
}
