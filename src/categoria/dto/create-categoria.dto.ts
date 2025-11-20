import { IsString, IsInt, IsOptional, IsBoolean } from 'class-validator';

export class CreateCategoriaDto {
  @IsInt()
  empresaId: number;

  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsInt()
  ordem?: number;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}
