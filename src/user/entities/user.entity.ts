export class User {
    id: number;
    empresaId: number;
    nome: string;
    senha: string;
    email: string;
    imagem?: string;
    permissao?: number;
    updatedAt: Date;
    createdAt: Date;
    token?: string;
    ativo: boolean;
    loginAtivo?: boolean;
    motivo?: string;
    validade?: Date;
    perfil?: number;
    celular?: string;
    cadastro?: number;
}
