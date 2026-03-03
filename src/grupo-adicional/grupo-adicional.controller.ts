import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GrupoAdicionalService } from './grupo-adicional.service';
import { CreateGrupoAdicionalDto } from './dto/create-grupo-adicional.dto';
import { UpdateGrupoAdicionalDto } from './dto/update-grupo-adicional.dto';

@Controller('grupos-adicionais')
export class GrupoAdicionalController {
  constructor(
    private readonly grupoAdicionalService: GrupoAdicionalService,
  ) {}

  @Post()
  create(@Body() createGrupoAdicionalDto: CreateGrupoAdicionalDto) {
    return this.grupoAdicionalService.create(createGrupoAdicionalDto);
  }

  @Get()
  findAll() {
    return this.grupoAdicionalService.findAll();
  }

  @Get('empresa/:empresaId')
  findByEmpresa(@Param('empresaId') empresaId: string) {
    return this.grupoAdicionalService.findByEmpresa(+empresaId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.grupoAdicionalService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGrupoAdicionalDto: UpdateGrupoAdicionalDto,
  ) {
    return this.grupoAdicionalService.update(+id, updateGrupoAdicionalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.grupoAdicionalService.remove(+id);
  }

  @Post(':id/duplicate')
  duplicate(@Param('id') id: string) {
    return this.grupoAdicionalService.duplicate(+id);
  }

  @Get(':id/vinculos')
  checkVinculos(@Param('id') id: string) {
    return this.grupoAdicionalService.checkVinculos(+id);
  }

  @Patch(':id/soft-delete')
  softDelete(@Param('id') id: string) {
    return this.grupoAdicionalService.softDelete(+id);
  }

  @Post('reorder')
  reorder(@Body() body: { ids: number[] }) {
    return this.grupoAdicionalService.reorder(body.ids);
  }
}
