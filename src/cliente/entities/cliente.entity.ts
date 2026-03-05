import { Cliente as PrismaCliente } from '@prisma/client';

export class Cliente implements PrismaCliente {
  id: number;
  empresaId: number;
  nome: string | null;
  telefone: string;
  email: string | null;
  cpf: string | null;
  cep: string | null;
  logradouro: string | null;
  numero: string | null;
  complemento: string | null;
  bairro: string | null;
  cidade: string | null;
  uf: string | null;
  referencia: string | null;
  createdAt: Date;
  updatedAt: Date;
}
