import { PartialType } from '@nestjs/mapped-types';
import { CreateGrupoAdicionalDto } from './create-grupo-adicional.dto';

export class UpdateGrupoAdicionalDto extends PartialType(
  CreateGrupoAdicionalDto,
) {}
