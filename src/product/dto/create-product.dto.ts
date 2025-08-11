import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    nome_produto: string;

    @IsOptional()
    @IsString()
    status?: string;

    @IsNotEmpty()
    @IsInt()
    sistema_id: number; // 👈 adicionado para permitir usar no service
}