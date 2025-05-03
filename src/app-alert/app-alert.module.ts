import { Module } from '@nestjs/common';
import { AppAlertService } from './app-alert.service';
import { AppAlertController } from './app-alert.controller';

@Module({
  controllers: [AppAlertController],
  providers: [AppAlertService],
})
export class AppAlertModule {}
