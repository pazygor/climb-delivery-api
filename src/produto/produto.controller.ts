import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtoService.create(createProdutoDto);
  }

  @Get()
  findAll() {
    return this.produtoService.findAll();
  }

  @Get('empresa/:empresaId')
  findByEmpresa(@Param('empresaId') empresaId: string) {
    return this.produtoService.findByEmpresa(+empresaId);
  }

  @Get('categoria/:categoriaId')
  findByCategoria(@Param('categoriaId') categoriaId: string) {
    return this.produtoService.findByCategoria(+categoriaId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtoService.update(+id, updateProdutoDto);
  }

  @Patch(':id/disponibilidade')
  toggleDisponibilidade(
    @Param('id') id: string,
    @Body('disponivel') disponivel: boolean,
  ) {
    return this.produtoService.update(+id, { disponivel });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtoService.remove(+id);
  }

  @Post(':id/duplicate')
  duplicate(@Param('id') id: string) {
    return this.produtoService.duplicate(+id);
  }

  @Post(':id/imagem')
  @UseInterceptors(
    FileInterceptor('imagem', {
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (allowedMimeTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(new Error('Apenas arquivos JPG, JPEG, PNG e WEBP são aceitos'), false);
        }
      },
    }),
  )
  uploadImagem(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.produtoService.uploadImagem(+id, file);
  }
}
