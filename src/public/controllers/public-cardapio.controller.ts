import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { Public } from '../../common/decorators/public.decorator';
import { PublicService } from '../services/public.service';

@Controller('public/:slug')
export class PublicCardapioController {
  constructor(private readonly publicService: PublicService) {}

  /**
   * GET /public/:slug
   * Retorna informações básicas do restaurante
   * Endpoint público - não requer autenticação
   */
  @Public()
  @Get()
  async getRestaurante(@Param('slug') slug: string) {
    try {
      return await this.publicService.getEmpresaBySlug(slug);
    } catch (error) {
      if (error.status === 404) {
        throw error;
      }
      throw new HttpException(
        'Erro ao buscar informações do restaurante',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * GET /public/:slug/cardapio
   * Retorna cardápio completo do restaurante com:
   * - Informações da empresa
   * - Categorias com produtos
   * - Grupos de adicionais por produto
   * - Configurações visuais do link público
   * 
   * Endpoint público - não requer autenticação
   */
  @Public()
  @Get('cardapio')
  async getCardapio(@Param('slug') slug: string) {
    try {
      return await this.publicService.getCardapio(slug);
    } catch (error) {
      if (error.status === 404) {
        throw error;
      }
      throw new HttpException(
        'Erro ao buscar cardápio do restaurante',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
