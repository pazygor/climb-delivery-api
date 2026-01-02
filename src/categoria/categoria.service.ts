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

  async esgotarTodos(id: number, esgotado: boolean) {
    // Atualiza todos os produtos da categoria
    await this.prisma.produto.updateMany({
      where: { categoriaId: id },
      data: { disponivel: !esgotado },
    });

    // Retorna a categoria atualizada com os produtos
    return this.prisma.categoria.findUnique({
      where: { id },
      include: {
        produtos: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.categoria.delete({
      where: { id },
    });
  }

  async duplicate(id: number) {
    // Buscar categoria original com produtos
    const categoriaOriginal = await this.prisma.categoria.findUnique({
      where: { id },
      include: {
        produtos: {
          include: {
            gruposProduto: true,
          },
        },
      },
    });

    if (!categoriaOriginal) {
      throw new Error('Categoria não encontrada');
    }

    // Criar nova categoria com dados do original
    const novaCategoria = await this.prisma.categoria.create({
      data: {
        empresaId: categoriaOriginal.empresaId,
        nome: `${categoriaOriginal.nome} (cópia)`,
        descricao: categoriaOriginal.descricao,
        ordem: categoriaOriginal.ordem,
        ativo: categoriaOriginal.ativo,
      },
    });

    // Duplicar todos os produtos da categoria
    for (const produtoOriginal of categoriaOriginal.produtos) {
      const novoProduto = await this.prisma.produto.create({
        data: {
          empresaId: produtoOriginal.empresaId,
          categoriaId: novaCategoria.id,
          nome: produtoOriginal.nome,
          descricao: produtoOriginal.descricao,
          preco: produtoOriginal.preco,
          imagem: produtoOriginal.imagem,
          disponivel: produtoOriginal.disponivel,
          destaque: produtoOriginal.destaque,
          vendidoPorKg: produtoOriginal.vendidoPorKg,
          tempoPreparo: produtoOriginal.tempoPreparo,
          ordem: produtoOriginal.ordem,
        },
      });

      // Duplicar vinculações com grupos de adicionais
      if (produtoOriginal.gruposProduto.length > 0) {
        await this.prisma.produtoGrupoAdicional.createMany({
          data: produtoOriginal.gruposProduto.map((gp) => ({
            produtoId: novoProduto.id,
            grupoAdicionalId: gp.grupoAdicionalId,
            ordem: gp.ordem,
          })),
        });
      }
    }

    // Retornar categoria duplicada
    return this.findOne(novaCategoria.id);
  }
}
