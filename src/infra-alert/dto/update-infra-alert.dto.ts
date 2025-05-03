import { PartialType } from '@nestjs/mapped-types';
import { CreateInfraAlertDto } from './create-infra-alert.dto';

export class UpdateInfraAlertDto extends PartialType(CreateInfraAlertDto) {}
