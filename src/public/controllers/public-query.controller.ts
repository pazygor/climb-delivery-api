import { Controller, Get, Param } from '@nestjs/common';
import { Public } from '../../common/decorators/public.decorator';
import { PublicPedidoService } from '../services/public-pedido.service';

/**
 * Controller para rotas públicas que não dependem de slug
 */
@Controller('public')
export class PublicQueryController {
  constructor(private readonly publicPedidoService: PublicPedidoService) {}

  /**
   * GET /public/pedido/:numero
   * Busca pedido por número (para página de confirmação)
   */
  @Public()
  @Get('pedido/:numero')
  async getPedido(@Param('numero') numero: string) {
    return this.publicPedidoService.getPedidoByNumero(numero);
  }
}
