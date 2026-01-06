import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ConfiguracaoLinkPublicoService } from './configuracao-link-publico.service';
import { CreateConfiguracaoDto } from './dto/create-configuracao.dto';
import { UpdateConfiguracaoDto } from './dto/update-configuracao.dto';

@Controller('configuracao-link-publico')
@UseGuards(JwtAuthGuard)
export class ConfiguracaoLinkPublicoController {
  constructor(
    private readonly configuracaoService: ConfiguracaoLinkPublicoService,
  ) {}

  /**
   * POST /configuracao-link-publico
   * Cria configuração para uma empresa
   * TODO: Implementar na Sprint 4
   */
  @Post()
  async create(@Body() createDto: CreateConfiguracaoDto) {
    return { message: 'Endpoint para criar configuração - Sprint 4', data: createDto };
  }

  /**
   * GET /configuracao-link-publico/empresa/:empresaId
   * Busca configuração por empresa
   * TODO: Implementar na Sprint 4
   */
  @Get('empresa/:empresaId')
  async findByEmpresa(@Param('empresaId') empresaId: string) {
    return { message: 'Endpoint para buscar configuração - Sprint 4', empresaId };
  }

  /**
   * PUT /configuracao-link-publico/:id
   * Atualiza configuração
   * TODO: Implementar na Sprint 4
   */
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateConfiguracaoDto) {
    return { message: 'Endpoint para atualizar configuração - Sprint 4', id, data: updateDto };
  }
}
