import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { CreatePedidoManualDto } from './dto/create-pedido-manual.dto';
import { UpdateStatusPedidoDto } from './dto/update-status-pedido.dto';
import { ReportFiltersDto } from './dto/report-filters.dto';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  create(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidoService.create(createPedidoDto);
  }

  @Post('manual')
  createManual(@Body() createPedidoManualDto: CreatePedidoManualDto) {
    return this.pedidoService.createManual(createPedidoManualDto);
  }

  @Get()
  findAll(@Query('status') status?: string) {
    return this.pedidoService.findAll(status);
  }

  @Get('empresa/:empresaId')
  findByEmpresa(
    @Param('empresaId') empresaId: string,
    @Query('status') status?: string,
  ) {
    return this.pedidoService.findByEmpresa(+empresaId, status);
  }

  @Get('usuario/:usuarioId')
  findByUsuario(@Param('usuarioId') usuarioId: string) {
    return this.pedidoService.findByUsuario(+usuarioId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pedidoService.findOne(+id);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusPedidoDto,
  ) {
    return this.pedidoService.updateStatus(+id, updateStatusDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePedidoDto: UpdatePedidoDto) {
    return this.pedidoService.update(+id, updatePedidoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pedidoService.remove(+id);
  }

  @Get('relatorio/empresa/:empresaId')
  async getReport(
    @Param('empresaId') empresaId: string,
    @Query('dataInicio') dataInicio: string,
    @Query('dataFim') dataFim: string,
  ) {
    try {
      if (!dataInicio || !dataFim) {
        throw new HttpException(
          'dataInicio e dataFim são obrigatórios',
          HttpStatus.BAD_REQUEST,
        );
      }

      const filters: ReportFiltersDto = {
        empresaId: +empresaId,
        dataInicio,
        dataFim,
      };

      return await this.pedidoService.getReport(filters);
    } catch (error) {
      throw new HttpException(
        error.message || 'Erro ao gerar relatório',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
