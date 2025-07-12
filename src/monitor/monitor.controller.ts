import { Controller, Get, Post, Body, Query, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { CreateMonitorDto } from './dto/create-monitor.dto';
import { UpdateMonitorDto } from './dto/update-monitor.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // ajuste aqui

@Controller('monitor')
export class MonitorController {
  constructor(private readonly monitorService: MonitorService) { }
  @Post()
  create(@Body() createMonitoramentoDto: CreateMonitorDto) {
    return this.monitorService.create(createMonitoramentoDto);
  }
  @Post('monitor-completo')
  createMonitoramentoCompleto(@Body() dados: any) {
    return this.monitorService.createMonitoramentoCompleto(dados);
  }
  @Get('validar')
  //@UseGuards(JwtAuthGuard)
  async validarLimite(
    @Query('tipo') tipo: 'SVS Monitor' | 'SVS Insights',
    @Query('qtdNova') qtdNova: number,
    @Query('empresaId') empresaId: number
  ) {
    return this.monitorService.validarCriacaoMonitoramento(
      Number(empresaId),
      tipo,
      Number(qtdNova)
    );
  }
  @Get()
  findAll(@Query('empresaId') empresaId: string) {
    return this.monitorService.findAllByEmpresa(Number(empresaId));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.monitorService.findOne(Number(id));
  }
  @Get('usuario/:usuarioId')
  getMonitoramentosPorUsuario(@Param('usuarioId') usuarioId: string) {
    return this.monitorService.getMonitoramentosPorUsuario(+usuarioId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateMonitorDto) {
    return this.monitorService.update(Number(id), updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.monitorService.remove(Number(id));
  }

}
