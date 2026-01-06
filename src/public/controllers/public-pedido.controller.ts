import { Controller, Post, Body, Param } from '@nestjs/common';
import { Public } from '../../common/decorators/public.decorator';
import { PublicPedidoService } from '../services/public-pedido.service';
import { CreatePedidoPublicoDto } from '../dto/create-pedido-publico.dto';

@Controller('public/:slug')
export class PublicPedidoController {
  constructor(private readonly publicPedidoService: PublicPedidoService) {}

  /**
   * POST /public/:slug/pedidos
   * Cria novo pedido via área pública
   */
  @Public()
  @Post('pedidos')
  async create(
    @Param('slug') slug: string,
    @Body() createPedidoDto: CreatePedidoPublicoDto,
  ) {
    // TODO: Implementar na Sprint 8
    return { 
      message: 'Endpoint público - Criar pedido',
      slug,
      data: createPedidoDto 
    };
  }
}
