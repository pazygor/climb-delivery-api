import {
    IsString, IsEmail, IsInt, IsOptional, IsBoolean, IsDateString, IsArray
} from 'class-validator';

export class CreateUserDto {
    @IsInt()
    empresaId: number;

    @IsString()
    nome: string;

    @IsString()
    senha: string;

    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    imagem?: string;

    @IsInt() // Obrigatório agora
    permissaoId: number;

    @IsOptional()
    @IsString()
    token?: string;

    @IsOptional()
    @IsBoolean()
    ativo?: boolean;

    @IsOptional()
    @IsBoolean()
    loginAtivo?: boolean;

    @IsOptional()
    @IsString()
    motivo?: string;

    @IsOptional()
    @IsDateString()
    validade?: Date;

    @IsOptional()
    @IsInt()
    perfil?: number;

    @IsOptional()
    @IsString()
    celular?: string;

    @IsOptional()
    @IsInt()
    cadastro?: number;

    @IsOptional()
    @IsString()
    account?: string;

    @IsOptional()
    @IsString()
    emailLanguage?: string;

    @IsOptional()
    @IsString()
    appLanguage?: string;

    @IsOptional()
    @IsString()
    country?: string;

    @IsOptional()
    @IsBoolean()
    autoProjectCreation?: boolean;

    @IsOptional()
    @IsString()
    throughPutUnit?: string;

    // Novo campo para os produtos permitidos
    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    produtosPermitidos?: number[]; // IDs dos produtos

    // Novo campo para os sistemas permitidos
    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    sistemasPermitidos?: number[]; // IDs dos sistemas
}