import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Injectable()
export class EmpresaService {
  constructor(private readonly prisma: PrismaService) {}

  create(createEmpresaDto: CreateEmpresaDto) {
    return this.prisma.empresa.create({
      data: createEmpresaDto,
    });
  }

  findAll() {
    return this.prisma.empresa.findMany({
      select: {
        id: true,
        cnpj: true,
        razaoSocial: true,
        nomeFantasia: true,
        telefone: true,
        email: true,
        endereco: true,
        numero: true,
        complemento: true,
        bairro: true,
        cidade: true,
        uf: true,
        cep: true,
        ativo: true,
        logo: true,
        horarioAbertura: true,
        horarioFechamento: true,
        taxaEntrega: true,
        tempoMedioEntrega: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.empresa.findUnique({
      where: { id },
      include: {
        categorias: true,
        produtos: true,
      },
    });
  }

  update(id: number, updateEmpresaDto: UpdateEmpresaDto) {
    return this.prisma.empresa.update({
      where: { id },
      data: updateEmpresaDto,
    });
  }

  remove(id: number) {
    return this.prisma.empresa.delete({
      where: { id },
    });
  }
}
