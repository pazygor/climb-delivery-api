import { IsInt, IsOptional, IsString } from 'class-validator';
export class CreateCompanyProductDto {
    @IsInt()
    empresa_id: number;

    @IsInt()
    produto_id: number;

    @IsOptional()
    @IsString()
    status?: string; // se não vier, default "ativo"
}
