export class Company {
    id: number;
    cnpj: string;
    razaoSocial: string;
    cidade: string;
    uf: string;
    endereco: string;
    bairro: string;
    cep: string;
    dataAdesao: Date;
    horaAdesao: Date;
    tenant: string;
    env: string;
    modoContratado: string;
    limiteProjetos: number;
    limiteServidores: number;
}