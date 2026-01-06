import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfiguracaoLinkPublicoController } from './configuracao-link-publico.controller';
import { ConfiguracaoLinkPublicoService } from './configuracao-link-publico.service';

@Module({
  imports: [PrismaModule],
  controllers: [ConfiguracaoLinkPublicoController],
  providers: [ConfiguracaoLinkPublicoService],
  exports: [ConfiguracaoLinkPublicoService],
})
export class ConfiguracaoLinkPublicoModule {}
