import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';

@Module({
  imports: [
    MulterModule.register({
      limits: {
        fileSize: 2 * 1024 * 1024, // 2MB
      },
    }),
  ],
  controllers: [ProdutoController],
  providers: [ProdutoService],
  exports: [ProdutoService],
})
export class ProdutoModule {}
