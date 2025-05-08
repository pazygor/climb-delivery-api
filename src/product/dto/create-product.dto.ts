import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    nome_produto: string;

    @IsOptional()
    @IsString()
    status?: string;
}
