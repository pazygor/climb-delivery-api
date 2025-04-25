import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // ajuste se o caminho for diferente
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createProjectDto: CreateProjectDto) {
    const data: any = {
      nome: createProjectDto.nome,
      env: createProjectDto.env,
      tenant: createProjectDto.tenant,
      userProp: createProjectDto.userProp,
      status: createProjectDto.status,
      inicio: createProjectDto.inicio,
    };

    if (createProjectDto.empresaId) {
      data.empresaId = createProjectDto.empresaId;
    }

    return this.prisma.project.create({ data });
  }

  async findAll() {
    return this.prisma.project.findMany({
      include: {
        servers: true,
        empresa: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.project.findUnique({
      where: { id },
      include: {
        servers: true,
        empresa: true,
      },
    });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.prisma.project.update({
      where: { id },
      data: updateProjectDto,
    });
  }

  async remove(id: number) {
    return this.prisma.project.delete({
      where: { id },
    });
  }
}