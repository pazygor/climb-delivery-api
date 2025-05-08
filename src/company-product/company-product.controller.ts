import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompanyProductService } from './company-product.service';
import { CreateCompanyProductDto } from './dto/create-company-product.dto';
import { UpdateCompanyProductDto } from './dto/update-company-product.dto';

@Controller('company-product')
export class CompanyProductController {
  constructor(private readonly empresaProdutoService: CompanyProductService) { }

  @Post()
  create(@Body() dto: CreateCompanyProductDto) {
    return this.empresaProdutoService.create(dto);
  }

  @Get(':empresa_id')
  findProdutos(@Param('empresa_id') empresa_id: string) {
    return this.empresaProdutoService.findProdutosByEmpresa(+empresa_id);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.empresaProdutoService.updateStatus(+id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empresaProdutoService.removeAssociation(+id);
  }
}
