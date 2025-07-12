import { Controller, Post, Body, UseGuards, Get, Res, Param, ParseIntPipe } from '@nestjs/common';
import { ExternalService } from './external.service';
import { ExportarExternalDto } from './dto/create-external.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // ajuste aqui
import { User } from '../common/decorators/user.decorator';
import { UsuarioToken } from '../common/interfaces/usuario-token.interface';
import { Response } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('external')
export class ExternalController {
  constructor(private readonly externalService: ExternalService) { }

  @Post('exportar')
  async exportarParaApi(
    @Body() dto: ExportarExternalDto,
    @User() user: UsuarioToken,
  ) {
    await this.externalService.exportarDados(dto, user.userId);
    return { sucesso: true };
  }
  @Get('download/:id')
  async baixarInstalador(
    @Param('id', ParseIntPipe) monitoramentoId: number,
    @Res() res: Response
  ) {
    return this.externalService.baixarInstalador(monitoramentoId, res);
  }
}
