import { PartialType } from '@nestjs/mapped-types';
import { CreateAdicionalDto } from './create-adicional.dto';

export class UpdateAdicionalDto extends PartialType(CreateAdicionalDto) {}
