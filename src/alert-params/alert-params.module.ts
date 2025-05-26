import { Module } from '@nestjs/common';
import { AlertParamsService } from './alert-params.service';
import { AlertParamsController } from './alert-params.controller';

@Module({
  controllers: [AlertParamsController],
  providers: [AlertParamsService],
})
export class AlertParamsModule {}
