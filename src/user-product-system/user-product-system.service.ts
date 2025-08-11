import { Injectable } from '@nestjs/common';
import { CreateUserProductSystemDto } from './dto/create-user-product-system.dto';
import { UpdateUserProductSystemDto } from './dto/update-user-product-system.dto';

@Injectable()
export class UserProductSystemService {
  create(createUserProductSystemDto: CreateUserProductSystemDto) {
    return 'This action adds a new userProductSystem';
  }

  findAll() {
    return `This action returns all userProductSystem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userProductSystem`;
  }

  update(id: number, updateUserProductSystemDto: UpdateUserProductSystemDto) {
    return `This action updates a #${id} userProductSystem`;
  }

  remove(id: number) {
    return `This action removes a #${id} userProductSystem`;
  }
}
