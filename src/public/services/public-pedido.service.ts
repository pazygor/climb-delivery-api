import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePedidoPublicoDto, TipoPedido } from '../dto/create-pedido-publico.dto';
import { ClienteService } from '../../cliente/cliente.service';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class PublicPedidoService {
  constructor(
    private prisma: PrismaService,
    private clienteService: ClienteService,
  ) {}

  /**
   * Cria pedido via área pública
   */
  async createPedidoPublico(slug: string, createPedidoDto: CreatePedidoPublicoDto) {
    // 1. Buscar empresa por slug
    const empresa = await this.prisma.empresa.findUnique({
      where: { slug },
    });

    if (!empresa) {
      throw new NotFoundException('Restaurante não encontrado');
    }

    // 2. Validar se empresa está ativa
    if (!empresa.ativo) {
      throw new BadRequestException('Restaurante temporariamente indisponível');
    }

    // 3. Validar horário de funcionamento (opcional - pode ser implementado depois)
    // TODO: Implementar validação de horário

    // 4. Buscar ou criar cliente
    const clienteData = {
      telefone: createPedidoDto.cliente.telefone,
      nome: createPedidoDto.cliente.nome,
      email: createPedidoDto.cliente.email,
      cpf: createPedidoDto.cliente.cpf,
      // Se tiver endereço e for entrega, salvar no cliente
      ...(createPedidoDto.tipoPedido === TipoPedido.ENTREGA && createPedidoDto.endereco ? {
        cep: createPedidoDto.endereco.cep,
        logradouro: createPedidoDto.endereco.logradouro,
        numero: createPedidoDto.endereco.numero,
        complemento: createPedidoDto.endereco.complemento,
        bairro: createPedidoDto.endereco.bairro,
        cidade: createPedidoDto.endereco.cidade,
        uf: createPedidoDto.endereco.uf,
        referencia: createPedidoDto.endereco.referencia,
      } : {}),
    };

    const cliente = await this.clienteService.findOrCreate(empresa.id, clienteData);

    // 5. Validar produtos disponíveis
    const produtoIds = createPedidoDto.itens.map(item => item.produtoId);
    const produtos = await this.prisma.produto.findMany({
      where: {
        id: { in: produtoIds },
        empresaId: empresa.id,
        disponivel: true,
      },
    });

    if (produtos.length !== produtoIds.length) {
      throw new BadRequestException('Um ou mais produtos não estão disponíveis');
    }

    // 6. Validar adicionais disponíveis
    const adicionalIds = createPedidoDto.itens
      .flatMap(item => item.adicionais.map(adic => adic.adicionalId));
    
    if (adicionalIds.length > 0) {
      const adicionais = await this.prisma.adicional.findMany({
        where: {
          id: { in: adicionalIds },
          ativo: true,
        },
      });

      if (adicionais.length !== new Set(adicionalIds).size) {
        throw new BadRequestException('Um ou mais adicionais não estão disponíveis');
      }
    }

    // 7. Calcular valores
    let subtotal = new Decimal(0);

    // Calcular preço de cada item
    for (const itemDto of createPedidoDto.itens) {
      const produto = produtos.find(p => p.id === itemDto.produtoId);
      if (!produto) continue;

      let precoItem = new Decimal(produto.preco);

      // Adicionar preço dos adicionais
      if (itemDto.adicionais.length > 0) {
        const adicionaisIds = itemDto.adicionais.map(a => a.adicionalId);
        const adicionaisItem = await this.prisma.adicional.findMany({
          where: { id: { in: adicionaisIds } },
        });

        for (const adicDto of itemDto.adicionais) {
          const adicional = adicionaisItem.find(a => a.id === adicDto.adicionalId);
          if (adicional) {
            const precoAdicional = new Decimal(adicional.preco).mul(adicDto.quantidade);
            precoItem = precoItem.add(precoAdicional);
          }
        }
      }

      // Multiplicar pela quantidade
      const subtotalItem = precoItem.mul(itemDto.quantidade);
      subtotal = subtotal.add(subtotalItem);
    }

    // 8. Adicionar taxa de entrega (apenas se for entrega)
    const taxaEntrega = createPedidoDto.tipoPedido === TipoPedido.ENTREGA 
      ? empresa.taxaEntrega 
      : new Decimal(0);

    const total = subtotal.add(taxaEntrega);

    // 9. Validar troco (se pagamento for dinheiro)
    if (createPedidoDto.formaPagamento === 'dinheiro' && createPedidoDto.trocoPara) {
      const trocoPara = new Decimal(createPedidoDto.trocoPara);
      if (trocoPara.lessThan(total)) {
        throw new BadRequestException('Valor do troco deve ser maior ou igual ao total do pedido');
      }
    }

    // 10. Gerar número do pedido único
    const numeroPedido = await this.gerarNumeroPedido();

    // 11. Buscar status inicial (pendente)
    const statusPendente = await this.prisma.statusPedido.findFirst({
      where: { codigo: 'pendente' },
    });

    if (!statusPendente) {
      throw new BadRequestException('Status "pendente" não encontrado no sistema');
    }

    // 12. Criar pedido no banco
    const pedido = await this.prisma.pedido.create({
      data: {
        empresaId: empresa.id,
        clienteId: cliente.id,
        usuarioId: null, // Pedido público não tem usuário
        enderecoId: null, // Endereço está no cliente
        statusId: statusPendente.id,
        numero: numeroPedido,
        tipoPedido: createPedidoDto.tipoPedido,
        subtotal,
        taxaEntrega,
        total,
        formaPagamento: createPedidoDto.formaPagamento,
        trocoPara: createPedidoDto.trocoPara ? new Decimal(createPedidoDto.trocoPara) : null,
        observacoes: createPedidoDto.observacoes,
        tempoEstimado: empresa.tempoMedioEntrega,
        // Criar itens do pedido
        itens: {
          create: await Promise.all(
            createPedidoDto.itens.map(async (itemDto) => {
              const produto = produtos.find(p => p.id === itemDto.produtoId);
              if (!produto) throw new BadRequestException('Produto não encontrado');

              // Calcular preço unitário (produto + adicionais)
              let precoUnitario = new Decimal(produto.preco);
              
              // Buscar adicionais para calcular preço
              const adicionaisItem = itemDto.adicionais.length > 0 
                ? await this.prisma.adicional.findMany({
                    where: { id: { in: itemDto.adicionais.map(a => a.adicionalId) } },
                  })
                : [];

              for (const adicDto of itemDto.adicionais) {
                const adicional = adicionaisItem.find(a => a.id === adicDto.adicionalId);
                if (adicional) {
                  precoUnitario = precoUnitario.add(
                    new Decimal(adicional.preco).mul(adicDto.quantidade)
                  );
                }
              }

              const subtotalItem = precoUnitario.mul(itemDto.quantidade);

              return {
                produtoId: produto.id,
                quantidade: itemDto.quantidade,
                precoUnitario,
                subtotal: subtotalItem,
                observacoes: itemDto.observacoes,
                // Criar adicionais do item
                adicionais: {
                  create: itemDto.adicionais.map((adicDto) => {
                    const adicional = adicionaisItem.find(a => a.id === adicDto.adicionalId);
                    return {
                      adicionalId: adicDto.adicionalId,
                      quantidade: adicDto.quantidade,
                      preco: adicional ? adicional.preco : new Decimal(0),
                    };
                  }),
                },
              };
            })
          ),
        },
        // Criar histórico inicial
        historico: {
          create: {
            statusId: statusPendente.id,
            observacao: 'Pedido criado via link público',
          },
        },
      },
      include: {
        cliente: true,
        status: true,
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
      },
    });

    return pedido;
  }

  /**
   * Gera número único para o pedido
   * Formato: YYYYMMDD-XXXXXX (data + 6 dígitos aleatórios)
   */
  private async gerarNumeroPedido(): Promise<string> {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = Math.floor(100000 + Math.random() * 900000);
    
    const numero = `${year}${month}${day}-${random}`;

    // Verificar se já existe
    const exists = await this.prisma.pedido.findUnique({
      where: { numero },
    });

    if (exists) {
      // Se existir, gera novamente (recursivo)
      return this.gerarNumeroPedido();
    }

    return numero;
  }

  /**
   * Busca pedido por número
   */
  async getPedidoByNumero(numero: string) {
    const pedido = await this.prisma.pedido.findUnique({
      where: { numero },
      include: {
        cliente: true,
        empresa: {
          select: {
            id: true,
            nomeFantasia: true,
            razaoSocial: true,
            whatsapp: true,
            telefone: true,
            logo: true,
          },
        },
        status: true,
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
        historico: {
          include: {
            status: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!pedido) {
      throw new NotFoundException('Pedido não encontrado');
    }

    return pedido;
  }
}
