import { Module } from '@nestjs/common';
import { AdicionalService } from './adicional.service';
import { AdicionalController } from './adicional.controller';

@Module({
  controllers: [AdicionalController],
  providers: [AdicionalService],
  exports: [AdicionalService],
})
export class AdicionalModule {}
