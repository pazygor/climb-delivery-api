import { IsOptional, IsString, IsDateString, IsInt } from 'class-validator';
export class CreateProjectDto {
    @IsString()
    nome: string;

    @IsString()
    env: string;

    @IsString()
    tenant: string;

    @IsDateString()
    inicio: string;

    @IsString()
    userProp: string;

    @IsString()
    status: string;

    @IsOptional()
    @IsInt()
    empresaId?: number;
}
