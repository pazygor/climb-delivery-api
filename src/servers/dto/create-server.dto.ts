import { IsString, IsNotEmpty, IsInt } from 'class-validator';
export class CreateServerDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsString()
    @IsNotEmpty()
    ip: string;

    @IsString()
    @IsNotEmpty()
    tipo: string;

    @IsString()
    @IsNotEmpty()
    sistemaOperacional: string;

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsInt()
    projetoId: number;

    @IsInt()
    empresaId: number;
}
