import { IsString, IsInt, IsArray, IsNotEmpty, IsJSON, IsOptional } from 'class-validator';

export class CreateMonitorDto {
    @IsInt()
    empresa_id: number;

    @IsString()
    @IsNotEmpty()
    nome_monitoramento: string;

    @IsString()
    @IsNotEmpty()
    produto: string; // "SVS Monitor" ou "SVS Insights"

    @IsArray()
    projetos: any[]; // array de objetos [{ id, nome }]

    @IsArray()
    servidores: any[]; // array de objetos [{ id, nome, projetoId }]

    @IsString()
    @IsOptional()
    status?: string; // opcional para permitir atualizar o status
}
