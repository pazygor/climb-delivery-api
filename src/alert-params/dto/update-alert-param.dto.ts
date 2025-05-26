import { PartialType } from '@nestjs/mapped-types';
import { CreateAlertParamDto } from './create-alert-param.dto';

export class UpdateAlertParamDto extends PartialType(CreateAlertParamDto) {}
