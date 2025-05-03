import { Injectable } from '@nestjs/common';
import { CreateGroupUserDto } from './dto/create-group-user.dto';
import { UpdateGroupUserDto } from './dto/update-group-user.dto';

@Injectable()
export class GroupUserService {
  create(createGroupUserDto: CreateGroupUserDto) {
    return 'This action adds a new groupUser';
  }

  findAll() {
    return `This action returns all groupUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} groupUser`;
  }

  update(id: number, updateGroupUserDto: UpdateGroupUserDto) {
    return `This action updates a #${id} groupUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} groupUser`;
  }
}
