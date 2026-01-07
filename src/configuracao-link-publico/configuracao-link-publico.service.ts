import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateConfiguracaoDto } from './dto/create-configuracao.dto';
import { UpdateConfiguracaoDto } from './dto/update-configuracao.dto';

@Injectable()
export class ConfiguracaoLinkPublicoService {
  constructor(private prisma: PrismaService) {}

  /**
   * Cria configuração visual para uma empresa
   * Valida se já existe configuração para evitar duplicidade
   */
  async create(createDto: CreateConfiguracaoDto) {
    // Verifica se já existe configuração para esta empresa
    const configuracaoExistente = await this.prisma.configuracaoLinkPublico.findUnique({
      where: { empresaId: createDto.empresaId },
    });

    if (configuracaoExistente) {
      throw new ConflictException('Empresa já possui configuração de link público');
    }

    // Verifica se a empresa existe
    const empresa = await this.prisma.empresa.findUnique({
      where: { id: createDto.empresaId },
    });

    if (!empresa) {
      throw new NotFoundException('Empresa não encontrada');
    }

    return this.prisma.configuracaoLinkPublico.create({
      data: createDto,
    });
  }

  /**
   * Busca todas as configurações (admin)
   */
  async findAll() {
    return this.prisma.configuracaoLinkPublico.findMany({
      include: {
        empresa: {
          select: {
            id: true,
            nomeFantasia: true,
            razaoSocial: true,
            slug: true,
          },
        },
      },
    });
  }

  /**
   * Busca configuração por ID
   */
  async findOne(id: number) {
    const configuracao = await this.prisma.configuracaoLinkPublico.findUnique({
      where: { id },
      include: {
        empresa: {
          select: {
            id: true,
            nomeFantasia: true,
            razaoSocial: true,
            slug: true,
          },
        },
      },
    });

    if (!configuracao) {
      throw new NotFoundException('Configuração não encontrada');
    }

    return configuracao;
  }

  /**
   * Busca configuração por ID da empresa
   * Retorna configuração padrão se não existir
   */
  async findByEmpresaId(empresaId: number) {
    // Verifica se a empresa existe
    const empresa = await this.prisma.empresa.findUnique({
      where: { id: empresaId },
    });

    if (!empresa) {
      throw new NotFoundException('Empresa não encontrada');
    }

    // Busca configuração existente
    let configuracao = await this.prisma.configuracaoLinkPublico.findUnique({
      where: { empresaId },
    });

    // Se não existir, cria uma configuração padrão
    if (!configuracao) {
      configuracao = await this.createDefault(empresaId);
    }

    return configuracao;
  }

  /**
   * Atualiza configuração visual
   */
  async update(id: number, updateDto: UpdateConfiguracaoDto) {
    // Verifica se a configuração existe
    const configuracao = await this.prisma.configuracaoLinkPublico.findUnique({
      where: { id },
    });

    if (!configuracao) {
      throw new NotFoundException('Configuração não encontrada');
    }

    return this.prisma.configuracaoLinkPublico.update({
      where: { id },
      data: updateDto,
    });
  }

  /**
   * Remove configuração (volta para padrão)
   */
  async remove(id: number) {
    const configuracao = await this.prisma.configuracaoLinkPublico.findUnique({
      where: { id },
    });

    if (!configuracao) {
      throw new NotFoundException('Configuração não encontrada');
    }

    return this.prisma.configuracaoLinkPublico.delete({
      where: { id },
    });
  }

  /**
   * Cria configuração padrão para uma empresa
   * Usado quando empresa não tem configuração customizada
   */
  async createDefault(empresaId: number) {
    return this.prisma.configuracaoLinkPublico.create({
      data: {
        empresaId,
        // Banner
        exibirBanner: true,
        mensagemBanner: 'Bem-vindo ao nosso cardápio!',
        // Cores padrão (vermelho vibrante)
        corPrimaria: '#cc0000',
        corSecundaria: '#ffa000',
        corAcento: '#00bfa5',
        corTexto: '#212121',
        corFundo: '#ffffff',
        corHeaderBackground: '#cc0000',
        corHeaderTexto: '#ffffff',
        // Estilo padrão
        estiloBotao: 'rounded',
        estiloCard: 'shadow',
        tamanhoFonte: 'medium',
        // Exibição
        exibirPromocoes: true,
        exibirDestaques: true,
        // SEO (preenche com dados da empresa se disponível)
        metaTitulo: 'Cardápio Online',
        metaDescricao: 'Faça seu pedido online de forma rápida e prática',
      },
    });
  }

  /**
   * Valida se uma cor é hexadecimal válida
   */
  private isValidHexColor(color: string): boolean {
    return /^#[0-9A-Fa-f]{6}$/.test(color);
  }

  /**
   * Valida se uma URL é válida
   */
  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}
