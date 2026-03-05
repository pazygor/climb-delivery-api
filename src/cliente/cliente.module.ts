import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ClienteService],
  exports: [ClienteService],
})
export class ClienteModule {}
