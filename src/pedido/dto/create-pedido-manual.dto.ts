import {
  IsInt,
  IsString,
  IsOptional,
  IsDecimal,
  IsArray,
  ValidateNested,
  IsIn,
  IsEmail,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

// DTO para dados do cliente
class ClienteDto {
  @IsString()
  @Matches(/^\d{10,11}$/, { message: 'Telefone deve conter 10 ou 11 dígitos' })
  telefone: string;

  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{11}$/, { message: 'CPF deve conter 11 dígitos' })
  cpf?: string;
}

// DTO para endereço de entrega (condicional)
class EnderecoDto {
  @IsString()
  @Matches(/^\d{8}$/, { message: 'CEP deve conter 8 dígitos' })
  cep: string;

  @IsString()
  logradouro: string;

  @IsString()
  numero: string;

  @IsOptional()
  @IsString()
  complemento?: string;

  @IsString()
  bairro: string;

  @IsString()
  cidade: string;

  @IsString()
  @Matches(/^[A-Z]{2}$/, { message: 'UF deve conter 2 letras maiúsculas' })
  uf: string;

  @IsOptional()
  @IsString()
  referencia?: string;
}

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
  usuarioId: number; // Atendente que está registrando o pedido

  // Dados do cliente (obrigatório)
  @ValidateNested()
  @Type(() => ClienteDto)
  cliente: ClienteDto;

  // Tipo de pedido
  @IsString()
  @IsIn(['entrega', 'retirada'], { message: 'Tipo de pedido deve ser entrega ou retirada' })
  tipoPedido: string;

  // Endereço (obrigatório se tipoPedido === 'entrega')
  @IsOptional()
  @ValidateNested()
  @Type(() => EnderecoDto)
  endereco?: EnderecoDto;

  @IsOptional()
  @IsString()
  numero?: string; // Número do pedido (gerado automaticamente se não fornecido)

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
  @IsIn(['dinheiro', 'cartao', 'pix'], { message: 'Forma de pagamento inválida' })
  formaPagamento: string;

  @IsOptional()
  @IsDecimal()
  trocoPara?: number;

  @IsOptional()
  @IsString()
  observacoes?: string; // Apenas observações reais do pedido

  @IsOptional()
  @IsInt()
  tempoEstimado?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemPedidoManualDto)
  itens: ItemPedidoManualDto[];
}
