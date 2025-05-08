import { Controller, Get, Post, Body, Query, Param, Patch, Delete } from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { CreateMonitorDto } from './dto/create-monitor.dto';
import { UpdateMonitorDto } from './dto/update-monitor.dto';

@Controller('monitor')
export class MonitorController {
  constructor(private readonly monitorService: MonitorService) { }
  @Post()
  create(@Body() createMonitoramentoDto: CreateMonitorDto) {
    return this.monitorService.create(createMonitoramentoDto);
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
