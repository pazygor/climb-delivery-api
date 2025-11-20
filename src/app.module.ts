import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { EmpresaModule } from './empresa/empresa.module';
import { CategoriaModule } from './categoria/categoria.module';
import { ProdutoModule } from './produto/produto.module';
import { GrupoAdicionalModule } from './grupo-adicional/grupo-adicional.module';
import { AdicionalModule } from './adicional/adicional.module';
import { PedidoModule } from './pedido/pedido.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    EmpresaModule,
    CategoriaModule,
    ProdutoModule,
    GrupoAdicionalModule,
    AdicionalModule,
    PedidoModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
