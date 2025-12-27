import {
  IsInt,
  IsString,
  IsOptional,
  IsDecimal,
  IsArray,
  ValidateNested,
  IsBoolean,
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

class ItemPedidoManualDto {
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

export class CreatePedidoManualDto {
  @IsInt()
  empresaId: number;

  @IsInt()
  usuarioId: number;

  @IsString()
  enderecoEntrega: string; // Endereço completo como string

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
  observacoes?: string; // Inclui dados do cliente (nome, telefone)

  @IsOptional()
  @IsInt()
  tempoEstimado?: number;

  @IsOptional()
  @IsBoolean()
  trocoNecessario?: boolean;

  @IsOptional()
  @IsDecimal()
  valorTroco?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemPedidoManualDto)
  itens: ItemPedidoManualDto[];
}
