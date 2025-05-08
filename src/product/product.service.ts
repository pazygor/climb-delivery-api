import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createProdutoDto: CreateProductDto) {
    return this.prisma.produto.create({ data: createProdutoDto });
  }

  async findAll() {
    return this.prisma.produto.findMany();
  }

  async findOne(id: number) {
    const produto = await this.prisma.produto.findUnique({ where: { id } });
    if (!produto) throw new NotFoundException(`Produto ${id} não encontrado`);
    return produto;
  }

  async update(id: number, updateProdutoDto: UpdateProductDto) {
    await this.findOne(id); // valida se existe
    return this.prisma.produto.update({
      where: { id },
      data: updateProdutoDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // valida se existe
    return this.prisma.produto.delete({ where: { id } });
  }

  async getProdutosDisponiveis(empresaId: number) {
    return this.prisma.produto.findMany({
      where: {
        status: 'ativo',
        empresas: { some: { empresa_id: empresaId } },
      },
      select: { id: true, nome_produto: true, status: true },
    });
  }
}
