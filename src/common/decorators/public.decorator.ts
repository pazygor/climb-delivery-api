import { SetMetadata } from '@nestjs/common';

/**
 * Decorator para marcar rotas como públicas (sem necessidade de autenticação)
 * Usado em conjunto com o JwtAuthGuard
 */
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
