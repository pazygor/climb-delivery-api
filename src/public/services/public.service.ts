import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PublicService {
  constructor(private prisma: PrismaService) {}

  /**
   * Busca empresa por slug
   * TODO: Implementar na Sprint 3
   */
  async getEmpresaBySlug(slug: string) {
    // Estrutura básica - implementação completa na Sprint 3
    const empresa = await this.prisma.empresa.findUnique({
      where: { slug },
    });

    if (!empresa) {
      throw new NotFoundException('Restaurante não encontrado');
    }

    if (!empresa.ativo) {
      throw new NotFoundException('Restaurante temporariamente indisponível');
    }

    return empresa;
  }

  /**
   * Busca cardápio completo do restaurante
   * TODO: Implementar na Sprint 3
   */
  async getCardapio(slug: string) {
    // Implementação completa na Sprint 3
    return { message: 'Método a ser implementado' };
  }

  /**
   * Verifica se restaurante está aberto
   * TODO: Implementar lógica de horário na Sprint 3
   */
  isRestauranteAberto(horarioAbertura: string, horarioFechamento: string): boolean {
    // Implementação na Sprint 3
    return true;
  }
}
