import { Injectable } from '@nestjs/common';
import { CreateGroupAlertDto } from './dto/create-group-alert.dto';
import { UpdateGroupAlertDto } from './dto/update-group-alert.dto';

@Injectable()
export class GroupAlertService {
  create(createGroupAlertDto: CreateGroupAlertDto) {
    return 'This action adds a new groupAlert';
  }

  findAll() {
    return `This action returns all groupAlert`;
  }

  findOne(id: number) {
    return `This action returns a #${id} groupAlert`;
  }

  update(id: number, updateGroupAlertDto: UpdateGroupAlertDto) {
    return `This action updates a #${id} groupAlert`;
  }

  remove(id: number) {
    return `This action removes a #${id} groupAlert`;
  }
}
