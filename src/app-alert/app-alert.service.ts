import { Injectable } from '@nestjs/common';
import { CreateAppAlertDto } from './dto/create-app-alert.dto';
import { UpdateAppAlertDto } from './dto/update-app-alert.dto';

@Injectable()
export class AppAlertService {
  create(createAppAlertDto: CreateAppAlertDto) {
    return 'This action adds a new appAlert';
  }

  findAll() {
    return `This action returns all appAlert`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appAlert`;
  }

  update(id: number, updateAppAlertDto: UpdateAppAlertDto) {
    return `This action updates a #${id} appAlert`;
  }

  remove(id: number) {
    return `This action removes a #${id} appAlert`;
  }
}
