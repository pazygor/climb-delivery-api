import { IsString, IsOptional } from 'class-validator';

export class UpdateStatusPedidoDto {
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  motivoCancelamento?: string;
}
