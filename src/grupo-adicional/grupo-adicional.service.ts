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

  // Duplicar grupo com todos os adicionais
  async duplicate(id: number) {
    const grupoOriginal = await this.prisma.grupoAdicional.findUnique({
      where: { id },
      include: {
        adicionais: true,
      },
    });

    if (!grupoOriginal) {
      throw new Error('Grupo não encontrado');
    }

    // Cria novo grupo
    const novoGrupo = await this.prisma.grupoAdicional.create({
      data: {
        empresaId: grupoOriginal.empresaId,
        nome: `${grupoOriginal.nome} (Cópia)`,
        descricao: grupoOriginal.descricao,
        minimo: grupoOriginal.minimo,
        maximo: grupoOriginal.maximo,
        obrigatorio: grupoOriginal.obrigatorio,
        tipoPrecificacao: grupoOriginal.tipoPrecificacao,
        tipoSelecao: grupoOriginal.tipoSelecao,
        minimoSelecao: grupoOriginal.minimoSelecao,
        maximoSelecao: grupoOriginal.maximoSelecao,
        ordem: grupoOriginal.ordem,
        ativo: grupoOriginal.ativo,
      },
    });

    // Duplica os adicionais
    if (grupoOriginal.adicionais.length > 0) {
      await this.prisma.adicional.createMany({
        data: grupoOriginal.adicionais.map((adicional) => ({
          grupoAdicionalId: novoGrupo.id,
          nome: adicional.nome,
          descricao: adicional.descricao,
          preco: adicional.preco,
          ordem: adicional.ordem,
          ativo: adicional.ativo,
        })),
      });
    }

    return this.findOne(novoGrupo.id);
  }

  // Verificar vínculos com produtos
  async checkVinculos(id: number) {
    const vinculos = await this.prisma.produtoGrupoAdicional.findMany({
      where: { grupoAdicionalId: id },
      include: {
        produto: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });

    return {
      vinculado: vinculos.length > 0,
      produtos: vinculos.map((v) => v.produto),
    };
  }

  // Soft delete (desativar)
  async softDelete(id: number) {
    return this.prisma.grupoAdicional.update({
      where: { id },
      data: { ativo: false },
    });
  }

  // Reordenar grupos
  async reorder(ids: number[]) {
    const updates = ids.map((id, index) =>
      this.prisma.grupoAdicional.update({
        where: { id },
        data: { ordem: index },
      }),
    );

    await this.prisma.$transaction(updates);
    return { success: true };
  }
}
