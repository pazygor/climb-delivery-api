import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PublicService {
  constructor(private prisma: PrismaService) {}

  /**
   * Busca empresa por slug
   * Retorna apenas dados públicos necessários para exibição
   */
  async getEmpresaBySlug(slug: string) {
    const empresa = await this.prisma.empresa.findUnique({
      where: { slug },
      select: {
        id: true,
        nomeFantasia: true,
        razaoSocial: true,
        logo: true,
        telefone: true,
        whatsapp: true,
        horarioAbertura: true,
        horarioFechamento: true,
        taxaEntrega: true,
        tempoMedioEntrega: true,
        endereco: true,
        numero: true,
        bairro: true,
        cidade: true,
        uf: true,
        ativo: true,
      },
    });

    if (!empresa) {
      throw new NotFoundException('Restaurante não encontrado');
    }

    if (!empresa.ativo) {
      throw new NotFoundException('Restaurante temporariamente indisponível');
    }

    // Adiciona informação se está aberto
    const isAberto = empresa.horarioAbertura && empresa.horarioFechamento
      ? this.isRestauranteAberto(empresa.horarioAbertura, empresa.horarioFechamento)
      : true;

    return {
      ...empresa,
      aberto: isAberto,
    };
  }

  /**
   * Busca cardápio completo do restaurante com configurações visuais
   * Retorna empresa, categorias com produtos e grupos de adicionais
   */
  async getCardapio(slug: string) {
    // Busca a empresa primeiro
    const empresa = await this.getEmpresaBySlug(slug);

    // Busca configurações visuais do restaurante
    const configuracaoVisual = await this.prisma.configuracaoLinkPublico.findUnique({
      where: { empresaId: empresa.id },
    });

    // Busca todas as categorias ativas com produtos e adicionais
    const categorias = await this.prisma.categoria.findMany({
      where: {
        empresaId: empresa.id,
        ativo: true,
      },
      orderBy: {
        ordem: 'asc',
      },
      include: {
        produtos: {
          orderBy: {
            ordem: 'asc',
          },
          include: {
            gruposProduto: {
              orderBy: {
                ordem: 'asc',
              },
              include: {
                grupoAdicional: {
                  include: {
                    adicionais: {
                      where: {
                        ativo: true,
                      },
                      orderBy: {
                        ordem: 'asc',
                      },
                      select: {
                        id: true,
                        nome: true,
                        descricao: true,
                        preco: true,
                        ordem: true,
                        ativo: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    // Formata resposta removendo dados desnecessários e filtrando grupos inativos
    const categoriasFormatadas = categorias.map(categoria => ({
      id: categoria.id,
      nome: categoria.nome,
      descricao: categoria.descricao,
      ordem: categoria.ordem,
      produtos: categoria.produtos.map(produto => ({
        id: produto.id,
        nome: produto.nome,
        descricao: produto.descricao,
        preco: produto.preco,
        imagem: produto.imagem,
        disponivel: produto.disponivel,
        destaque: produto.destaque,
        tempoPreparo: produto.tempoPreparo,
        gruposAdicionais: produto.gruposProduto
          .filter(gp => gp.grupoAdicional && gp.grupoAdicional.ativo) // Filtra grupos inativos
          .map(gp => ({
            id: gp.grupoAdicional.id,
            nome: gp.grupoAdicional.nome,
            descricao: gp.grupoAdicional.descricao,
            obrigatorio: gp.grupoAdicional.obrigatorio,
            tipoSelecao: gp.grupoAdicional.tipoSelecao,
            minimoSelecao: gp.grupoAdicional.minimoSelecao,
            maximoSelecao: gp.grupoAdicional.maximoSelecao,
            ordem: gp.grupoAdicional.ordem,
            adicionais: gp.grupoAdicional.adicionais,
          })),
      })),
    }));

    return {
      empresa,
      categorias: categoriasFormatadas,
      configuracaoVisual,
    };
  }

  /**
   * Verifica se restaurante está aberto no momento atual
   * Formato esperado: "HH:MM" (ex: "08:00", "22:30")
   */
  isRestauranteAberto(horarioAbertura: string, horarioFechamento: string): boolean {
    try {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();

      const [abreHora, abreMinuto] = horarioAbertura.split(':').map(Number);
      const [fechaHora, fechaMinuto] = horarioFechamento.split(':').map(Number);

      const abertura = abreHora * 60 + abreMinuto;
      const fechamento = fechaHora * 60 + fechaMinuto;

      // Se fecha depois da meia-noite (ex: abre 18:00, fecha 02:00)
      if (fechamento < abertura) {
        return currentTime >= abertura || currentTime <= fechamento;
      }

      // Horário normal (ex: abre 08:00, fecha 22:00)
      return currentTime >= abertura && currentTime <= fechamento;
    } catch (error) {
      // Em caso de erro no parse, retorna true (aberto)
      console.error('Erro ao verificar horário:', error);
      return true;
    }
  }
}
