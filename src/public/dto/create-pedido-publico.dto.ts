import { IsNotEmpty, IsString, IsEmail, IsArray, IsOptional, IsEnum, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export enum TipoPedido {
  ENTREGA = 'ENTREGA',
  RETIRADA = 'RETIRADA',
}

export enum FormaPagamento {
  DINHEIRO = 'DINHEIRO',
  CARTAO_DEBITO = 'CARTAO_DEBITO',
  CARTAO_CREDITO = 'CARTAO_CREDITO',
  PIX = 'PIX',
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

export class CreatePedidoPublicoDto {
  // Dados do cliente
  @IsString()
  @IsNotEmpty()
  nomeCliente: string;

  @IsString()
  @IsNotEmpty()
  telefoneCliente: string;

  @IsOptional()
  @IsEmail()
  emailCliente?: string;

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
