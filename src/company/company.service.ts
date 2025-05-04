import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // ajuste o path conforme seu projeto
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreateCompanyDto) {
    const data = {
      ...dto,
      dataAdesao: new Date(dto.dataAdesao),
      horaAdesao: new Date(`1970-01-01T${dto.horaAdesao}`),
    };

    return this.prisma.empresa.create({ data });
  }

  async findAll() {
    const companies = await this.prisma.empresa.findMany();
    return companies.map((company) => ({
      ...company,
      horaAdesao: company.horaAdesao
        ? company.horaAdesao.toTimeString().split(' ')[0] // pega só "HH:MM:SS"
        : null,
    }));
  }

  async findOne(id: number) {
    const company = await this.prisma.empresa.findUnique({ where: { id } });
    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return {
      ...company,
      horaAdesao: company.horaAdesao
        ? company.horaAdesao.toTimeString().split(' ')[0]
        : null,
    };
  }

  async update(id: number, dto: UpdateCompanyDto) {
    const company = await this.prisma.empresa.findUnique({ where: { id } });
    if (!company) {
      throw new NotFoundException('Company not found');
    }

    let data: any = { ...dto };

    if (dto.dataAdesao) {
      data.dataAdesao = new Date(dto.dataAdesao);
    }
    if (dto.horaAdesao) {
      data.horaAdesao = new Date(`1970-01-01T${dto.horaAdesao}`);
    }

    return this.prisma.empresa.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const company = await this.prisma.empresa.findUnique({ where: { id } });
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    return this.prisma.empresa.delete({ where: { id } });
  }
}
