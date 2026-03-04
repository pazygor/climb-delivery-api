import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsInt,
  Length,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateEmpresaDto {
  @IsString()
  @Length(14, 14)
  cnpj: string;

  @IsString()
  razaoSocial: string;

  @IsOptional()
  @IsString()
  nomeFantasia?: string;

  @IsOptional()
  @IsString()
  @Length(3, 100)
  slug?: string;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  endereco: string;

  @IsOptional()
  @IsString()
  numero?: string;

  @IsOptional()
  @IsString()
  complemento?: string;

  @IsString()
  bairro: string;

  @IsString()
  cidade: string;

  @IsString()
  @Length(2, 2)
  uf: string;

  @IsString()
  @Length(8, 8)
  cep: string;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsString()
  horarioAbertura?: string;

  @IsOptional()
  @IsString()
  horarioFechamento?: string;

  @IsOptional()
  @Transform(({ value }) => value === null || value === '' ? undefined : value)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  taxaEntrega?: number;

  @IsOptional()
  @Transform(({ value }) => value === null || value === '' ? undefined : value)
  @IsInt()
  tempoMedioEntrega?: number;

  @IsOptional()
  @Transform(({ value }) => value === null || value === '' ? undefined : value)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  pedidoMinimo?: number;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsString()
  chavePix?: string;

  @IsOptional()
  @IsString()
  whatsapp?: string;

  @IsOptional()
  @IsString()
  instagram?: string;

  @IsOptional()
  @IsString()
  facebook?: string;
}
