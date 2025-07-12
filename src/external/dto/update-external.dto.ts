import { PartialType } from '@nestjs/mapped-types';
import { ExportarExternalDto } from './create-external.dto';

export class UpdateExternalDto extends PartialType(ExportarExternalDto) {}
