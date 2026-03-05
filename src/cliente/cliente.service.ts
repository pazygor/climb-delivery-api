import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClienteService {
  constructor(private prisma: PrismaService) {}

  /**
   * Busca cliente por telefone e empresa
   */
  async findByTelefoneAndEmpresa(telefone: string, empresaId: number) {
    return this.prisma.cliente.findUnique({
      where: {
        telefone_empresaId: {
          telefone,
          empresaId,
        },
      },
    });
  }

  /**
   * Cria novo cliente
   */
  async create(empresaId: number, data: CreateClienteDto) {
    return this.prisma.cliente.create({
      data: {
        empresaId,
        ...data,
      },
    });
  }

  /**
   * Atualiza cliente existente
   */
  async update(id: number, data: UpdateClienteDto) {
    const cliente = await this.prisma.cliente.findUnique({
      where: { id },
    });

    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }

    return this.prisma.cliente.update({
      where: { id },
      data,
    });
  }

  /**
   * Busca ou cria cliente
   * - Se existe: atualiza dados fornecidos
   * - Se não existe: cria novo
   */
  async findOrCreate(empresaId: number, data: CreateClienteDto) {
    const clienteExistente = await this.findByTelefoneAndEmpresa(
      data.telefone,
      empresaId,
    );

    if (clienteExistente) {
      // Cliente existe - atualiza apenas campos fornecidos (não nulos/vazios)
      const updateData: UpdateClienteDto = {};
      
      if (data.nome) updateData.nome = data.nome;
      if (data.email) updateData.email = data.email;
      if (data.cpf) updateData.cpf = data.cpf;
      if (data.cep) updateData.cep = data.cep;
      if (data.logradouro) updateData.logradouro = data.logradouro;
      if (data.numero) updateData.numero = data.numero;
      if (data.complemento) updateData.complemento = data.complemento;
      if (data.bairro) updateData.bairro = data.bairro;
      if (data.cidade) updateData.cidade = data.cidade;
      if (data.uf) updateData.uf = data.uf;
      if (data.referencia) updateData.referencia = data.referencia;

      // Se houver dados para atualizar, atualiza
      if (Object.keys(updateData).length > 0) {
        return this.update(clienteExistente.id, updateData);
      }

      return clienteExistente;
    }

    // Cliente não existe - cria novo
    return this.create(empresaId, data);
  }

  /**
   * Busca cliente por ID
   */
  async findOne(id: number) {
    const cliente = await this.prisma.cliente.findUnique({
      where: { id },
    });

    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }

    return cliente;
  }

  /**
   * Lista todos clientes de uma empresa
   */
  async findAllByEmpresa(empresaId: number) {
    return this.prisma.cliente.findMany({
      where: { empresaId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
