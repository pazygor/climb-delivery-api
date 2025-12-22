import { IsString, IsInt, IsOptional, IsBoolean } from 'class-validator';

export class CreateGrupoAdicionalDto {
  @IsInt()
  empresaId: number;

  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsInt()
  minimo?: number;

  @IsOptional()
  @IsInt()
  maximo?: number;

  @IsOptional()
  @IsBoolean()
  obrigatorio?: boolean;

  @IsOptional()
  @IsString()
  tipoPrecificacao?: string; // "somatorio" ou "substitui"

  @IsOptional()
  @IsString()
  tipoSelecao?: string; // "RADIO" ou "CHECKBOX"

  @IsOptional()
  @IsInt()
  minimoSelecao?: number; // Para CHECKBOX

  @IsOptional()
  @IsInt()
  maximoSelecao?: number; // Para CHECKBOX

  @IsOptional()
  @IsInt()
  ordem?: number;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}
