import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompanyProductDto } from './dto/create-company-product.dto';
import { UpdateCompanyProductDto } from './dto/update-company-product.dto';

@Injectable()
export class CompanyProductService {
  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreateCompanyProductDto) {
    return this.prisma.empresaProduto.create({
      data: {
        empresa_id: dto.empresa_id,
        produto_id: dto.produto_id,
        status: dto.status ?? 'ativo',
      },
    });
  }

  async findProdutosByEmpresa(empresa_id: number) {
    return this.prisma.empresaProduto.findMany({
      where: { empresa_id },
      include: { produto: true },
    });
  }

  async updateStatus(id: number, status: string) {
    return this.prisma.empresaProduto.update({
      where: { id },
      data: { status },
    });
  }

  async removeAssociation(id: number) {
    return this.prisma.empresaProduto.delete({
      where: { id },
    });
  }
}
