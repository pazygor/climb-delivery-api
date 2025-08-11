import { Module } from '@nestjs/common';
import { UserProductSystemService } from './user-product-system.service';
import { UserProductSystemController } from './user-product-system.controller';

@Module({
  controllers: [UserProductSystemController],
  providers: [UserProductSystemService],
})
export class UserProductSystemModule {}
