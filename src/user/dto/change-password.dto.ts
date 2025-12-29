import { IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @MinLength(1)
  senhaAtual: string;

  @IsString()
  @MinLength(6)
  novaSenha: string;
}
