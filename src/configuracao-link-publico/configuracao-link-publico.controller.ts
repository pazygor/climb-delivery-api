import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete,
  Body, 
  Param, 
  ParseIntPipe,
  UseGuards,
  HttpException,
  HttpStatus
} from '@nestjs/common';
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
   * Cria nova configuração visual para uma empresa
   * Requer autenticação JWT
   */
  @Post()
  async create(@Body() createDto: CreateConfiguracaoDto) {
    try {
      return await this.configuracaoService.create(createDto);
    } catch (error) {
      if (error.status === 404 || error.status === 409) {
        throw error;
      }
      throw new HttpException(
        'Erro ao criar configuração',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * GET /configuracao-link-publico
   * Lista todas as configurações (admin)
   * Requer autenticação JWT
   */
  @Get()
  async findAll() {
    try {
      return await this.configuracaoService.findAll();
    } catch (error) {
      throw new HttpException(
        'Erro ao buscar configurações',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * GET /configuracao-link-publico/:id
   * Busca configuração por ID
   * Requer autenticação JWT
   */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.configuracaoService.findOne(id);
    } catch (error) {
      if (error.status === 404) {
        throw error;
      }
      throw new HttpException(
        'Erro ao buscar configuração',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * GET /configuracao-link-publico/empresa/:empresaId
   * Busca configuração por empresa
   * Cria configuração padrão se não existir
   * Requer autenticação JWT
   */
  @Get('empresa/:empresaId')
  async findByEmpresa(@Param('empresaId', ParseIntPipe) empresaId: number) {
    try {
      return await this.configuracaoService.findByEmpresaId(empresaId);
    } catch (error) {
      if (error.status === 404) {
        throw error;
      }
      throw new HttpException(
        'Erro ao buscar configuração da empresa',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * PUT /configuracao-link-publico/:id
   * Atualiza configuração visual
   * Requer autenticação JWT
   */
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateDto: UpdateConfiguracaoDto
  ) {
    try {
      return await this.configuracaoService.update(id, updateDto);
    } catch (error) {
      if (error.status === 404) {
        throw error;
      }
      throw new HttpException(
        'Erro ao atualizar configuração',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * DELETE /configuracao-link-publico/:id
   * Remove configuração (volta para padrão)
   * Requer autenticação JWT
   */
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.configuracaoService.remove(id);
    } catch (error) {
      if (error.status === 404) {
        throw error;
      }
      throw new HttpException(
        'Erro ao remover configuração',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
