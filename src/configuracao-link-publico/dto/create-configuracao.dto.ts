import { IsInt, IsOptional, IsString, IsBoolean, Matches, IsEnum, IsUrl } from 'class-validator';

// Enums para estilos
export enum EstiloBotao {
  ROUNDED = 'rounded',
  SQUARE = 'square',
  PILL = 'pill',
}

export enum EstiloCard {
  SHADOW = 'shadow',
  BORDER = 'border',
  FLAT = 'flat',
}

export enum TamanhoFonte {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export class CreateConfiguracaoDto {
  @IsInt()
  empresaId: number;

  // Banner
  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'bannerUrl deve ser uma URL válida' })
  bannerUrl?: string;

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'bannerMobileUrl deve ser uma URL válida' })
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
  @Matches(/^#[0-9A-Fa-f]{6}$/, { message: 'corPrimaria deve ser uma cor hexadecimal válida (ex: #FF0000)' })
  corPrimaria?: string;

  @IsOptional()
  @IsString()
  @Matches(/^#[0-9A-Fa-f]{6}$/, { message: 'corSecundaria deve ser uma cor hexadecimal válida (ex: #FF0000)' })
  corSecundaria?: string;

  @IsOptional()
  @IsString()
  @Matches(/^#[0-9A-Fa-f]{6}$/, { message: 'corAcento deve ser uma cor hexadecimal válida (ex: #FF0000)' })
  corAcento?: string;

  @IsOptional()
  @IsString()
  @Matches(/^#[0-9A-Fa-f]{6}$/, { message: 'corTexto deve ser uma cor hexadecimal válida (ex: #212121)' })
  corTexto?: string;

  @IsOptional()
  @IsString()
  @Matches(/^#[0-9A-Fa-f]{6}$/, { message: 'corFundo deve ser uma cor hexadecimal válida (ex: #FFFFFF)' })
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
  @IsUrl({}, { message: 'logoUrl deve ser uma URL válida' })
  logoUrl?: string;

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'faviconUrl deve ser uma URL válida' })
  faviconUrl?: string;

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'logoHeaderUrl deve ser uma URL válida' })
  logoHeaderUrl?: string;

  // Estilo (validação por enum)
  @IsOptional()
  @IsEnum(EstiloBotao, { message: 'estiloBotao deve ser: rounded, square ou pill' })
  estiloBotao?: EstiloBotao;

  @IsOptional()
  @IsEnum(EstiloCard, { message: 'estiloCard deve ser: shadow, border ou flat' })
  estiloCard?: EstiloCard;

  @IsOptional()
  @IsEnum(TamanhoFonte, { message: 'tamanhoFonte deve ser: small, medium ou large' })
  tamanhoFonte?: TamanhoFonte;

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
  @IsUrl({}, { message: 'urlFacebook deve ser uma URL válida' })
  urlFacebook?: string;

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'urlInstagram deve ser uma URL válida' })
  urlInstagram?: string;

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'urlTwitter deve ser uma URL válida' })
  urlTwitter?: string;
}
