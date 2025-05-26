import { Module } from '@nestjs/common';
import { AlertUserService } from './alert-user.service';
import { AlertUserController } from './alert-user.controller';

@Module({
  controllers: [AlertUserController],
  providers: [AlertUserService],
})
export class AlertUserModule {}
