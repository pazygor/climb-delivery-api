import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdicionalService } from './adicional.service';
import { CreateAdicionalDto } from './dto/create-adicional.dto';
import { UpdateAdicionalDto } from './dto/update-adicional.dto';

@Controller('adicionais')
export class AdicionalController {
  constructor(private readonly adicionalService: AdicionalService) {}

  @Post()
  create(@Body() createAdicionalDto: CreateAdicionalDto) {
    return this.adicionalService.create(createAdicionalDto);
  }

  @Post('batch')
  createBatch(@Body() createAdicionaisDto: CreateAdicionalDto[]) {
    return this.adicionalService.createBatch(createAdicionaisDto);
  }

  @Get()
  findAll() {
    return this.adicionalService.findAll();
  }

  @Get('grupo/:grupoAdicionalId')
  findByGrupo(@Param('grupoAdicionalId') grupoAdicionalId: string) {
    return this.adicionalService.findByGrupo(+grupoAdicionalId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adicionalService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdicionalDto: UpdateAdicionalDto,
  ) {
    return this.adicionalService.update(+id, updateAdicionalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adicionalService.remove(+id);
  }
}
