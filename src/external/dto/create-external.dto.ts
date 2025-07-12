import { IsArray, IsObject, IsString, IsNumber } from 'class-validator';

export class ProjetoDTO {
    @IsNumber()
    id: number;

    @IsString()
    nome: string;

    @IsString()
    tenant: string;

    @IsString()
    env: string;
}

export class ServidorDTO {
    @IsNumber()
    id: number;

    @IsString()
    ip: string;

    @IsString()
    nomeUsuario: string;

    @IsString()
    senhaUsuario: string;

    @IsNumber()
    projetoId: number;

    @IsNumber()
    empresaId: number;
}

export class ExportarExternalDto {
    @IsNumber()
    empresa_id: number;
    @IsNumber()
    id: number;

    @IsArray()
    projetos: ProjetoDTO[];

    @IsArray()
    servidores: ServidorDTO[];
}