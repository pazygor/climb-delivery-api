import {
  IsInt,
  IsString,
  IsOptional,
  IsDecimal,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ItemAdicionalDto {
  @IsInt()
  adicionalId: number;

  @IsInt()
  quantidade: number;

  @IsDecimal()
  preco: number;
}

class ItemPedidoDto {
  @IsInt()
  produtoId: number;

  @IsInt()
  quantidade: number;

  @IsDecimal()
  precoUnitario: number;

  @IsDecimal()
  subtotal: number;

  @IsOptional()
  @IsString()
  observacoes?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemAdicionalDto)
  adicionais?: ItemAdicionalDto[];
}

export class CreatePedidoDto {
  @IsInt()
  empresaId: number;

  @IsInt()
  usuarioId: number;

  @IsInt()
  enderecoId: number;

  @IsString()
  numero: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsDecimal()
  subtotal: number;

  @IsDecimal()
  taxaEntrega: number;

  @IsDecimal()
  total: number;

  @IsString()
  formaPagamento: string;

  @IsOptional()
  @IsString()
  observacoes?: string;

  @IsOptional()
  @IsInt()
  tempoEstimado?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemPedidoDto)
  itens: ItemPedidoDto[];
}
