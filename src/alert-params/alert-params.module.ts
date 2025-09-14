import { Module } from '@nestjs/common';
import { AlertParamsService } from './alert-params.service';
import { AlertParamsController } from './alert-params.controller';
import { HttpModule } from '@nestjs/axios';
import { EmailModule } from '../email/email.module';
import { ProtheusAlertsService } from './protheus-alerts.service';
@Module({
  controllers: [AlertParamsController],
  providers: [AlertParamsService, ProtheusAlertsService],
  imports: [HttpModule, EmailModule],
})
export class AlertParamsModule { }
