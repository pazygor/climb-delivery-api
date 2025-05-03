import { PartialType } from '@nestjs/mapped-types';
import { CreateAppAlertDto } from './create-app-alert.dto';

export class UpdateAppAlertDto extends PartialType(CreateAppAlertDto) {}
