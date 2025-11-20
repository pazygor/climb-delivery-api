import {
  IsString,
  IsInt,
  IsOptional,
  IsBoolean,
  IsDecimal,
} from 'class-validator';

export class CreateAdicionalDto {
  @IsInt()
  grupoAdicionalId: number;

  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsDecimal()
  preco?: number;

  @IsOptional()
  @IsInt()
  ordem?: number;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}
