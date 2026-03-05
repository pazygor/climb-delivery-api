import { IsNotEmpty, IsString, IsEmail, IsArray, IsOptional, IsEnum, IsNumber, ValidateNested, Matches } from 'class-validator';
import { Type } from 'class-transformer';

export enum TipoPedido {
  ENTREGA = 'entrega',
  RETIRADA = 'retirada',
}

export enum FormaPagamento {
  DINHEIRO = 'dinheiro',
  CARTAO = 'cartao',
  PIX = 'pix',
}

class ItemAdicionalDto {
  @IsNumber()
  adicionalId: number;

  @IsNumber()
  quantidade: number;
}

class ItemPedidoDto {
  @IsNumber()
  produtoId: number;

  @IsNumber()
  quantidade: number;

  @IsOptional()
  @IsString()
  observacoes?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemAdicionalDto)
  adicionais: ItemAdicionalDto[];
}

class EnderecoDto {
  @IsString()
  @IsNotEmpty()
  cep: string;

  @IsString()
  @IsNotEmpty()
  logradouro: string;

  @IsString()
  @IsNotEmpty()
  numero: string;

  @IsOptional()
  @IsString()
  complemento?: string;

  @IsString()
  @IsNotEmpty()
  bairro: string;

  @IsString()
  @IsNotEmpty()
  cidade: string;

  @IsString()
  @IsNotEmpty()
  uf: string;

  @IsOptional()
  @IsString()
  referencia?: string;
}

class ClienteDto {
  @IsString()
  @IsNotEmpty()
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

export class CreatePedidoPublicoDto {
  // Dados do cliente
  @ValidateNested()
  @Type(() => ClienteDto)
  cliente: ClienteDto;

  // Tipo de pedido
  @IsEnum(TipoPedido)
  tipoPedido: TipoPedido;

  // Endereço (obrigatório se ENTREGA)
  @IsOptional()
  @ValidateNested()
  @Type(() => EnderecoDto)
  endereco?: EnderecoDto;

  // Itens do pedido
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemPedidoDto)
  itens: ItemPedidoDto[];

  // Pagamento
  @IsEnum(FormaPagamento)
  formaPagamento: FormaPagamento;

  @IsOptional()
  @IsNumber()
  trocoPara?: number;

  @IsOptional()
  @IsString()
  observacoes?: string;
}
