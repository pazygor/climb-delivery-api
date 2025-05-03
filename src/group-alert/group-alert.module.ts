import { Module } from '@nestjs/common';
import { GroupAlertService } from './group-alert.service';
import { GroupAlertController } from './group-alert.controller';

@Module({
  controllers: [GroupAlertController],
  providers: [GroupAlertService],
})
export class GroupAlertModule {}
