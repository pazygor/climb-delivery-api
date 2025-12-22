import {
  IsString,
  IsInt,
  IsOptional,
  IsBoolean,
  IsDecimal,
} from 'class-validator';

export class CreateProdutoDto {
  @IsInt()
  empresaId: number;

  @IsInt()
  categoriaId: number;

  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsDecimal()
  preco: number;

  @IsOptional()
  @IsString()
  imagem?: string;

  @IsOptional()
  @IsBoolean()
  disponivel?: boolean;

  @IsOptional()
  @IsBoolean()
  destaque?: boolean;

  @IsOptional()
  @IsBoolean()
  vendidoPorKg?: boolean;

  @IsOptional()
  @IsInt()
  tempoPreparo?: number;

  @IsOptional()
  @IsInt()
  ordem?: number;
}
