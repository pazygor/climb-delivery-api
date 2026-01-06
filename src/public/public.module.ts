import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PublicCardapioController } from './controllers/public-cardapio.controller';
import { PublicPedidoController } from './controllers/public-pedido.controller';
import { PublicService } from './services/public.service';
import { PublicPedidoService } from './services/public-pedido.service';

@Module({
  imports: [PrismaModule],
  controllers: [PublicCardapioController, PublicPedidoController],
  providers: [PublicService, PublicPedidoService],
  exports: [PublicService, PublicPedidoService],
})
export class PublicModule {}
