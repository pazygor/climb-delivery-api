import { IsInt, IsOptional, IsString, IsBoolean, Matches } from 'class-validator';

export class CreateConfiguracaoDto {
  @IsInt()
  empresaId: number;

  // Banner
  @IsOptional()
  @IsString()
  bannerUrl?: string;

  @IsOptional()
  @IsString()
  bannerMobileUrl?: string;

  @IsOptional()
  @IsBoolean()
  exibirBanner?: boolean;

  @IsOptional()
  @IsString()
  mensagemBanner?: string;

  // Cores (validação hexadecimal)
  @IsOptional()
  @IsString()
  @Matches(/^#[0-9A-Fa-f]{6}$/, { message: 'corPrimaria deve ser uma cor hexadecimal válida' })
  corPrimaria?: string;

  @IsOptional()
  @IsString()
  @Matches(/^#[0-9A-Fa-f]{6}$/, { message: 'corSecundaria deve ser uma cor hexadecimal válida' })
  corSecundaria?: string;

  @IsOptional()
  @IsString()
  @Matches(/^#[0-9A-Fa-f]{6}$/, { message: 'corAcento deve ser uma cor hexadecimal válida' })
  corAcento?: string;

  @IsOptional()
  @IsString()
  @Matches(/^#[0-9A-Fa-f]{6}$/, { message: 'corTexto deve ser uma cor hexadecimal válida' })
  corTexto?: string;

  @IsOptional()
  @IsString()
  @Matches(/^#[0-9A-Fa-f]{6}$/, { message: 'corFundo deve ser uma cor hexadecimal válida' })
  corFundo?: string;

  @IsOptional()
  @IsString()
  @Matches(/^#[0-9A-Fa-f]{6}$/, { message: 'corHeaderBackground deve ser uma cor hexadecimal válida' })
  corHeaderBackground?: string;

  @IsOptional()
  @IsString()
  @Matches(/^#[0-9A-Fa-f]{6}$/, { message: 'corHeaderTexto deve ser uma cor hexadecimal válida' })
  corHeaderTexto?: string;

  // Logos
  @IsOptional()
  @IsString()
  logoUrl?: string;

  @IsOptional()
  @IsString()
  faviconUrl?: string;

  @IsOptional()
  @IsString()
  logoHeaderUrl?: string;

  // Estilo
  @IsOptional()
  @IsString()
  estiloBotao?: string;

  @IsOptional()
  @IsString()
  estiloCard?: string;

  @IsOptional()
  @IsString()
  tamanhoFonte?: string;

  // Exibição
  @IsOptional()
  @IsBoolean()
  exibirPromocoes?: boolean;

  @IsOptional()
  @IsBoolean()
  exibirDestaques?: boolean;

  // SEO
  @IsOptional()
  @IsString()
  metaTitulo?: string;

  @IsOptional()
  @IsString()
  metaDescricao?: string;

  @IsOptional()
  @IsString()
  metaKeywords?: string;

  // Redes Sociais
  @IsOptional()
  @IsString()
  urlFacebook?: string;

  @IsOptional()
  @IsString()
  urlInstagram?: string;

  @IsOptional()
  @IsString()
  urlTwitter?: string;
}
