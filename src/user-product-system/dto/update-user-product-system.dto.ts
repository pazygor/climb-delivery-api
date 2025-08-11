import { PartialType } from '@nestjs/mapped-types';
import { CreateUserProductSystemDto } from './create-user-product-system.dto';

export class UpdateUserProductSystemDto extends PartialType(CreateUserProductSystemDto) {}
