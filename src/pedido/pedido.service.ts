import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { CreatePedidoManualDto } from './dto/create-pedido-manual.dto';
import { UpdateStatusPedidoDto } from './dto/update-status-pedido.dto';

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
}
