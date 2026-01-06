import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Injectable()
export class EmpresaService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Gera slug único para a empresa baseado no nome fantasia
   * Remove acentos, caracteres especiais e substitui espaços por hífens
   */
  async generateSlug(nomeFantasia: string): Promise<string> {
    // Remove acentos e caracteres especiais
    let slug = nomeFantasia
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
      .trim()
      .replace(/\s+/g, '-') // Substitui espaços por hífens
      .replace(/-+/g, '-'); // Remove hífens duplicados

    // Verifica se slug já existe
    const slugExistente = await this.prisma.empresa.findUnique({
      where: { slug },
    });

    // Se existir, adiciona número incremental
    if (slugExistente) {
      let contador = 1;
      let novoSlug = `${slug}-${contador}`;
      
      while (await this.prisma.empresa.findUnique({ where: { slug: novoSlug } })) {
        contador++;
        novoSlug = `${slug}-${contador}`;
      }
      
      slug = novoSlug;
    }

    return slug;
  }

  /**
   * Valida se um slug está disponível
   */
  async isSlugDisponivel(slug: string, empresaId?: number): Promise<boolean> {
    const empresa = await this.prisma.empresa.findUnique({
      where: { slug },
    });

    // Slug disponível se não existir OU se pertence à empresa que está editando
    if (!empresa) {
      return true;
    }
    
    if (empresaId && empresa.id === empresaId) {
      return true;
    }
    
    return false;
  }

  async create(createEmpresaDto: CreateEmpresaDto) {
    // Gera slug automaticamente se não for fornecido
    let slug = createEmpresaDto.slug;
    
    if (!slug && createEmpresaDto.nomeFantasia) {
      slug = await this.generateSlug(createEmpresaDto.nomeFantasia);
    } else if (slug) {
      // Valida se o slug fornecido está disponível
      const disponivel = await this.isSlugDisponivel(slug);
      if (!disponivel) {
        throw new ConflictException('Slug já está em uso');
      }
    }

    return this.prisma.empresa.create({
      data: {
        ...createEmpresaDto,
        slug,
      },
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

  async update(id: number, updateEmpresaDto: UpdateEmpresaDto) {
    // Se está tentando atualizar o slug, valida disponibilidade
    if (updateEmpresaDto.slug) {
      const disponivel = await this.isSlugDisponivel(updateEmpresaDto.slug, id);
      if (!disponivel) {
        throw new ConflictException('Slug já está em uso');
      }
    }

    // Se mudou o nome fantasia mas não forneceu novo slug, regenera
    if (updateEmpresaDto.nomeFantasia && !updateEmpresaDto.slug) {
      const empresaAtual = await this.prisma.empresa.findUnique({ where: { id } });
      if (empresaAtual && updateEmpresaDto.nomeFantasia !== empresaAtual.nomeFantasia) {
        updateEmpresaDto.slug = await this.generateSlug(updateEmpresaDto.nomeFantasia);
      }
    }

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
