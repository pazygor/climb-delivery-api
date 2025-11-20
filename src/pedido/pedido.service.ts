import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';

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
            status: pedidoData.status || 'pendente',
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
        historico: true,
      },
    });
  }

  findAll(status?: string) {
    return this.prisma.pedido.findMany({
      where: status ? { status } : undefined,
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
        ...(status && { status }),
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

  async updateStatus(id: number, updatePedidoDto: UpdatePedidoDto) {
    const { status, motivoCancelamento } = updatePedidoDto;

    return this.prisma.pedido.update({
      where: { id },
      data: {
        status,
        motivoCancelamento,
        historico: {
          create: {
            status: status || '',
            observacao: motivoCancelamento || `Status alterado para ${status}`,
          },
        },
      },
      include: {
        historico: true,
      },
    });
  }

  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    // Remove campos que não podem ser atualizados diretamente
    const { itens, empresaId, usuarioId, enderecoId, numero, ...allowedData } = updatePedidoDto;
    
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
