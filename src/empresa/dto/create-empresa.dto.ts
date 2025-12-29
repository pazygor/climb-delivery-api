import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsDecimal,
  IsInt,
  Length,
} from 'class-validator';

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
  @IsDecimal()
  taxaEntrega?: number;

  @IsOptional()
  @IsInt()
  tempoMedioEntrega?: number;

  @IsOptional()
  @IsDecimal()
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
