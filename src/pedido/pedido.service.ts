import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { CreatePedidoManualDto } from './dto/create-pedido-manual.dto';
import { UpdateStatusPedidoDto } from './dto/update-status-pedido.dto';
import { ReportFiltersDto } from './dto/report-filters.dto';

@Injectable()
export class PedidoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPedidoDto: CreatePedidoDto) {
    const { itens, ...pedidoData } = createPedidoDto;

    return this.prisma.pedido.create({
      data: {
        ...pedidoData,
        itens: {
          create: itens.map((item) => ({
            produtoId: item.produtoId,
            quantidade: item.quantidade,
            precoUnitario: item.precoUnitario,
            subtotal: item.subtotal,
            observacoes: item.observacoes,
            adicionais: item.adicionais
              ? {
                  create: item.adicionais.map((adicional) => ({
                    adicionalId: adicional.adicionalId,
                    quantidade: adicional.quantidade,
                    preco: adicional.preco,
                  })),
                }
              : undefined,
          })),
        },
        historico: {
          create: {
            statusId: pedidoData.statusId,
            observacao: 'Pedido criado',
          },
        },
      },
      include: {
        itens: {
          include: {
            produto: true,
            adicionais: {
              include: {
                adicional: true,
              },
            },
          },
        },
        usuario: true,
        endereco: true,
        status: true,
        historico: {
          include: {
            status: true,
          },
        },
      },
    });
  }

  /**
   * Cria um pedido manual (atendente registrando pedido de telefone/balcão)
   * Cria automaticamente um endereço temporário com os dados fornecidos
   */
  async createManual(createPedidoManualDto: CreatePedidoManualDto) {
    const { itens, enderecoEntrega, status, ...pedidoData } = createPedidoManualDto;

    // Buscar o status (default: pendente)
    const statusPedido = await this.prisma.statusPedido.findFirst({
      where: { codigo: status || 'pendente' },
    });

    if (!statusPedido) {
      throw new Error('Status não encontrado');
    }

    // Criar endereço temporário com os dados fornecidos
    const endereco = await this.prisma.endereco.create({
      data: {
        usuarioId: pedidoData.usuarioId,
        titulo: 'Endereço de Entrega',
        logradouro: enderecoEntrega,
        numero: 'S/N',
        bairro: 'N/A',
        cidade: 'N/A',
        uf: 'NA',
        cep: '00000000',
        principal: false,
      },
    });

    // Criar o pedido
    return this.prisma.pedido.create({
      data: {
        ...pedidoData,
        statusId: statusPedido.id,
        enderecoId: endereco.id,
        itens: {
          create: itens.map((item) => ({
            produtoId: item.produtoId,
            quantidade: item.quantidade,
            precoUnitario: item.precoUnitario,
            subtotal: item.subtotal,
            observacoes: item.observacoes,
            adicionais: item.adicionais
              ? {
                  create: item.adicionais.map((adicional) => ({
                    adicionalId: adicional.adicionalId,
                    quantidade: adicional.quantidade,
                    preco: adicional.preco,
                  })),
                }
              : undefined,
          })),
        },
        historico: {
          create: {
            statusId: statusPedido.id,
            observacao: 'Pedido manual criado',
          },
        },
      },
      include: {
        itens: {
          include: {
            produto: true,
            adicionais: {
              include: {
                adicional: true,
              },
            },
          },
        },
        usuario: true,
        endereco: true,
        historico: true,
      },
    });
  }

  findAll(status?: string) {
    return this.prisma.pedido.findMany({
      where: status ? {
        status: {
          codigo: status,
        },
      } : undefined,
      include: {
        empresa: {
          select: {
            id: true,
            nomeFantasia: true,
          },
        },
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
          },
        },
        endereco: true,
        status: true,
        _count: {
          select: {
            itens: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findByEmpresa(empresaId: number, status?: string) {
    return this.prisma.pedido.findMany({
      where: {
        empresaId,
        ...(status && {
          status: {
            codigo: status,
          },
        }),
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            telefone: true,
          },
        },
        endereco: true,
        status: true,
        _count: {
          select: {
            itens: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findByUsuario(usuarioId: number) {
    return this.prisma.pedido.findMany({
      where: { usuarioId },
      include: {
        empresa: {
          select: {
            id: true,
            nomeFantasia: true,
            logo: true,
          },
        },
        itens: {
          include: {
            produto: true,
          },
        },
        historico: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: number) {
    return this.prisma.pedido.findUnique({
      where: { id },
      include: {
        empresa: true,
        usuario: true,
        endereco: true,
        itens: {
          include: {
            produto: true,
            adicionais: {
              include: {
                adicional: {
                  include: {
                    grupoAdicional: true,
                  },
                },
              },
            },
          },
        },
        historico: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
  }

  async updateStatus(id: number, updateStatusDto: UpdateStatusPedidoDto) {
    const { status, motivoCancelamento } = updateStatusDto;

    // Buscar o status pelo código
    const statusPedido = await this.prisma.statusPedido.findFirst({
      where: { codigo: status },
    });

    if (!statusPedido) {
      throw new Error(`Status '${status}' não encontrado`);
    }

    return this.prisma.pedido.update({
      where: { id },
      data: {
        statusId: statusPedido.id,
        motivoCancelamento,
        historico: {
          create: {
            statusId: statusPedido.id,
            observacao: motivoCancelamento || `Status alterado para ${statusPedido.nome}`,
          },
        },
      },
      include: {
        status: true,
        historico: {
          include: {
            status: true,
          },
        },
      },
    });
  }

  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    // Remove campos que não podem ser atualizados diretamente
    const { itens, empresaId, usuarioId, enderecoId, numero, statusId, ...allowedData } = updatePedidoDto;
    
    return this.prisma.pedido.update({
      where: { id },
      data: allowedData,
    });
  }

  remove(id: number) {
    return this.prisma.pedido.delete({
      where: { id },
    });
  }

  async getReport(filters: ReportFiltersDto) {
    const { empresaId, dataInicio, dataFim } = filters;

    // Valida se o período não ultrapassa 31 dias
    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);
    const diffTime = Math.abs(fim.getTime() - inicio.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 31) {
      throw new Error('O período máximo permitido é de 31 dias');
    }

    // Busca pedidos no período
    const pedidos = await this.prisma.pedido.findMany({
      where: {
        empresaId,
        createdAt: {
          gte: inicio,
          lte: fim,
        },
      },
      include: {
        itens: {
          include: {
            produto: true,
          },
        },
        status: true,
        historico: {
          include: {
            status: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    // Calcula estatísticas
    const totalPedidos = pedidos.length;
    const faturamentoTotal = pedidos.reduce((sum, p) => sum + Number(p.total), 0);
    const ticketMedio = totalPedidos > 0 ? faturamentoTotal / totalPedidos : 0;

    // Pedidos por status
    const statusCount = pedidos.reduce((acc, pedido) => {
      const status = pedido.status.codigo;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const pedidosPorStatus = Object.entries(statusCount).map(([status, quantidade]) => ({
      status,
      quantidade,
      percentual: totalPedidos > 0 ? Number(((quantidade / totalPedidos) * 100).toFixed(1)) : 0,
    }));

    // Produtos mais vendidos
    const produtosVendidos = pedidos.flatMap(p => p.itens);
    const produtosPorId = produtosVendidos.reduce((acc, item) => {
      const id = item.produtoId;
      if (!acc[id]) {
        acc[id] = {
          id,
          nome: item.produto.nome,
          quantidade: 0,
          faturamento: 0,
        };
      }
      acc[id].quantidade += item.quantidade;
      acc[id].faturamento += Number(item.subtotal);
      return acc;
    }, {} as Record<number, { id: number; nome: string; quantidade: number; faturamento: number }>);

    const produtosMaisVendidos = Object.values(produtosPorId)
      .sort((a, b) => b.quantidade - a.quantidade)
      .slice(0, 10);

    // Pedidos por dia
    const pedidosPorDia = pedidos.reduce((acc, pedido) => {
      const dia = pedido.createdAt.toISOString().split('T')[0];
      if (!acc[dia]) {
        acc[dia] = { data: dia, quantidade: 0, faturamento: 0 };
      }
      acc[dia].quantidade += 1;
      acc[dia].faturamento += Number(pedido.total);
      return acc;
    }, {} as Record<string, { data: string; quantidade: number; faturamento: number }>);

    const pedidosPorDiaArray = Object.values(pedidosPorDia).sort((a, b) => 
      a.data.localeCompare(b.data)
    );

    // Tempo médio de entrega (apenas pedidos entregues)
    const pedidosEntregues = pedidos.filter(p => p.status.codigo === 'entregue');
    let tempoMedioEntrega = 0;
    
    if (pedidosEntregues.length > 0) {
      const tempos = pedidosEntregues.map(p => {
        // Busca a data de quando o pedido foi marcado como entregue no histórico
        const statusEntregue = p.historico.find(h => h.status.codigo === 'entregue');
        if (statusEntregue && p.createdAt) {
          return (statusEntregue.createdAt.getTime() - p.createdAt.getTime()) / (1000 * 60); // em minutos
        }
        return 0;
      }).filter(t => t > 0);
      
      if (tempos.length > 0) {
        tempoMedioEntrega = Math.round(tempos.reduce((a, b) => a + b, 0) / tempos.length);
      }
    }

    return {
      periodo: {
        dataInicio,
        dataFim,
        dias: diffDays,
      },
      resumo: {
        totalPedidos,
        faturamentoTotal: Number(faturamentoTotal.toFixed(2)),
        ticketMedio: Number(ticketMedio.toFixed(2)),
        tempoMedioEntrega, // em minutos
        pedidosEntregues: pedidosEntregues.length,
        pedidosCancelados: pedidos.filter(p => p.status.codigo === 'cancelado').length,
      },
      pedidosPorStatus,
      produtosMaisVendidos,
      pedidosPorDia: pedidosPorDiaArray,
    };
  }
}
