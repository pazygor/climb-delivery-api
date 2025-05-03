import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupAlertDto } from './create-group-alert.dto';

export class UpdateGroupAlertDto extends PartialType(CreateGroupAlertDto) {}
