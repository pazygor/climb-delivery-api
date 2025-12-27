import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, senha: string) {
    const user = await this.prisma.usuario.findUnique({
      where: { email },
      // include: {
      //   usuarioProdutoSistemas: { // relação usuario_produto_sistema
      //     include: {
      //       produtoSistema: true // pega os detalhes do produto
      //     }
      //   }
      // }
    });

    if (!user) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    return user;
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.email, dto.senha);

    const payload = {
      sub: user.id,
      email: user.email,
      nome: user.nome,
      empresaId: user.empresaId,
      permissaoId: user.permissaoId,
    };

    const access_token = this.jwtService.sign(payload);

    // Extrair só os produtosSistema para enviar no retorno
    //const produtosSistema = user.usuarioProdutoSistemas.map(up => up.produtoSistema);

    return {
      access_token,
      //produtosSistema,
    };
  }

  /**
   * Solicita recuperação de senha
   * Gera um token único e salva no banco com data de expiração
   */
  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.prisma.usuario.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      // Por segurança, não revela se o email existe ou não
      return {
        message: 'Se o email existir em nossa base, você receberá um link de recuperação',
      };
    }

    // Gera token único
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date();
    resetTokenExpiry.setHours(resetTokenExpiry.getHours() + 1); // Token válido por 1 hora

    // Atualiza usuário com token
    await this.prisma.usuario.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    // TODO: Aqui você enviaria um email com o link de recuperação
    // const resetLink = `${process.env.FRONTEND_URL}/login/reset-password/${resetToken}`;
    // await this.emailService.sendPasswordResetEmail(user.email, resetLink);

    console.log(`Token de recuperação gerado para ${user.email}: ${resetToken}`);

    return {
      message: 'Se o email existir em nossa base, você receberá um link de recuperação',
    };
  }

  /**
   * Redefine a senha usando o token
   */
  async resetPassword(dto: ResetPasswordDto) {
    const user = await this.prisma.usuario.findFirst({
      where: {
        resetToken: dto.token,
        resetTokenExpiry: {
          gte: new Date(), // Token ainda não expirou
        },
      },
    });

    if (!user) {
      throw new BadRequestException('Token inválido ou expirado');
    }

    // Hash da nova senha
    const hashedPassword = await bcrypt.hash(dto.novaSenha, 10);

    // Atualiza senha e limpa o token
    await this.prisma.usuario.update({
      where: { id: user.id },
      data: {
        senha: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return {
      message: 'Senha redefinida com sucesso',
    };
  }
}