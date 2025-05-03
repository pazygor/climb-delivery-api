import { Module } from '@nestjs/common';
import { InfraAlertService } from './infra-alert.service';
import { InfraAlertController } from './infra-alert.controller';

@Module({
  controllers: [InfraAlertController],
  providers: [InfraAlertService],
})
export class InfraAlertModule {}
