import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // ajuste se o caminho for diferente
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    const {
      produtosPermitidos = [], // Array de produtoId
      sistemasPermitidos = [], // Novo array de produtoSistemaId
      senha,
      ...userData
    } = createUserDto;

    const hashedPassword = await bcrypt.hash(senha, 10);

    // 1. Cria o usuário
    const novoUsuario = await this.prisma.usuario.create({
      data: {
        ...userData,
        senha: hashedPassword,
      },
    });

    // 2. Cria os relacionamentos com produtos (usuario_produto)
    // if (produtosPermitidos.length > 0) {
    //   await this.prisma.usuarioProduto.createMany({
    //     data: produtosPermitidos.map((produtoId) => ({
    //       usuarioId: novoUsuario.id,
    //       produtoId,
    //     })),
    //     skipDuplicates: true,
    //   });
    // }

    // 3. Cria os relacionamentos com sistemas (usuario_produto_sistema)
    // if (sistemasPermitidos.length > 0) {
    //   await this.prisma.usuarioProdutoSistema.createMany({
    //     data: sistemasPermitidos.map((produtoSistemaId) => ({
    //       usuarioId: novoUsuario.id,
    //       produtoSistemaId,
    //     })),
    //     skipDuplicates: true,
    //   });
    // }

    return novoUsuario;
  }


  findAll() {
    return this.prisma.usuario.findMany({
      select: {
        id: true,
        empresaId: true,
        nome: true,
        email: true,
        telefone: true,
        foto: true,
        cpf: true,
        permissaoId: true,
        permissao: true,
        updatedAt: true,
        createdAt: true,
        ativo: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.usuario.findUnique({
      where: { id },
      select: {
        id: true,
        empresaId: true,
        nome: true,
        email: true,
        telefone: true,
        foto: true,
        cpf: true,
        permissaoId: true,
        permissao: true,
        updatedAt: true,
        createdAt: true,
        ativo: true,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let dataToUpdate = { ...updateUserDto };

    if (updateUserDto.senha) {
      const hashedPassword = await bcrypt.hash(updateUserDto.senha, 10);
      dataToUpdate.senha = hashedPassword;
    }

    return this.prisma.usuario.update({
      where: { id },
      data: dataToUpdate,
      select: {
        id: true,
        empresaId: true,
        nome: true,
        email: true,
        telefone: true,
        foto: true,
        cpf: true,
        permissaoId: true,
        permissao: true,
        updatedAt: true,
        createdAt: true,
        ativo: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.usuario.delete({
      where: { id },
    });
  }

  async changePassword(id: number, senhaAtual: string, novaSenha: string) {
    // Busca o usuário
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
    });

    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    // Verifica se a senha atual está correta
    const senhaValida = await bcrypt.compare(senhaAtual, usuario.senha);
    if (!senhaValida) {
      throw new Error('Senha atual incorreta');
    }

    // Hash da nova senha
    const novaSenhaHash = await bcrypt.hash(novaSenha, 10);

    // Atualiza a senha
    return this.prisma.usuario.update({
      where: { id },
      data: { senha: novaSenhaHash },
      select: {
        id: true,
        empresaId: true,
        nome: true,
        email: true,
        permissao: true,
        updatedAt: true,
        createdAt: true,
        ativo: true,
      },
    });
  }
}
