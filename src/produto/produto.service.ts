import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Injectable()
export class ProdutoService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProdutoDto: CreateProdutoDto) {
    return this.prisma.produto.create({
      data: createProdutoDto,
    });
  }

  findAll() {
    return this.prisma.produto.findMany({
      include: {
        categoria: {
          select: {
            id: true,
            nome: true,
          },
        },
        empresa: {
          select: {
            id: true,
            nomeFantasia: true,
          },
        },
      },
      orderBy: {
        ordem: 'asc',
      },
    });
  }

  findByEmpresa(empresaId: number) {
    return this.prisma.produto.findMany({
      where: { empresaId },
      include: {
        categoria: true,
        gruposProduto: {
          include: {
            grupoAdicional: {
              include: {
                adicionais: true,
              },
            },
          },
        },
      },
      orderBy: {
        ordem: 'asc',
      },
    });
  }

  findByCategoria(categoriaId: number) {
    return this.prisma.produto.findMany({
      where: { categoriaId },
      orderBy: {
        ordem: 'asc',
      },
    });
  }

  findOne(id: number) {
    return this.prisma.produto.findUnique({
      where: { id },
      include: {
        categoria: true,
        empresa: true,
        gruposProduto: {
          include: {
            grupoAdicional: {
              include: {
                adicionais: true,
              },
            },
          },
          orderBy: {
            ordem: 'asc',
          },
        },
      },
    });
  }

  update(id: number, updateProdutoDto: UpdateProdutoDto) {
    return this.prisma.produto.update({
      where: { id },
      data: updateProdutoDto,
    });
  }

  remove(id: number) {
    return this.prisma.produto.delete({
      where: { id },
    });
  }

  async uploadImagem(id: number, file: Express.Multer.File) {
    // Por enquanto, vamos salvar como base64 no banco
    // Em produção, seria melhor usar S3, Cloudinary, etc.
    const base64Image = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    
    await this.prisma.produto.update({
      where: { id },
      data: { imagem: base64Image },
    });

    return { url: base64Image };
  }
}
