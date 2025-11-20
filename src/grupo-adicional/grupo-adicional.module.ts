import { Module } from '@nestjs/common';
import { GrupoAdicionalService } from './grupo-adicional.service';
import { GrupoAdicionalController } from './grupo-adicional.controller';

@Module({
  controllers: [GrupoAdicionalController],
  providers: [GrupoAdicionalService],
  exports: [GrupoAdicionalService],
})
export class GrupoAdicionalModule {}
