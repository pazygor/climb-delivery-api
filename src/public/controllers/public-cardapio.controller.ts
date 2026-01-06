import { Controller, Get, Param } from '@nestjs/common';
import { Public } from '../../common/decorators/public.decorator';
import { PublicService } from '../services/public.service';

@Controller('public/:slug')
export class PublicCardapioController {
  constructor(private readonly publicService: PublicService) {}

  /**
   * GET /public/:slug
   * Retorna informações do restaurante
   */
  @Public()
  @Get()
  async getRestaurante(@Param('slug') slug: string) {
    // TODO: Implementar na Sprint 3
    return { message: 'Endpoint público - Informações do restaurante', slug };
  }

  /**
   * GET /public/:slug/cardapio
   * Retorna cardápio completo do restaurante
   */
  @Public()
  @Get('cardapio')
  async getCardapio(@Param('slug') slug: string) {
    // TODO: Implementar na Sprint 3
    return { message: 'Endpoint público - Cardápio completo', slug };
  }
}
