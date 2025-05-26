import { PartialType } from '@nestjs/mapped-types';
import { CreateAlertUserDto } from './create-alert-user.dto';

export class UpdateAlertUserDto extends PartialType(CreateAlertUserDto) {}
