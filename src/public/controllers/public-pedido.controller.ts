import { Controller, Post, Body, Param, Get, HttpCode, HttpStatus } from '@nestjs/common';
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
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Param('slug') slug: string,
    @Body() createPedidoDto: CreatePedidoPublicoDto,
  ) {
    return this.publicPedidoService.createPedidoPublico(slug, createPedidoDto);
  }

  /**
   * GET /public/pedido/:numero
   * Busca pedido por número (para página de confirmação)
   */
  @Public()
  @Get('/pedido/:numero')
  async getPedido(@Param('numero') numero: string) {
    return this.publicPedidoService.getPedidoByNumero(numero);
  }
}
