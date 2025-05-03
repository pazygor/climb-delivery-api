import { Injectable } from '@nestjs/common';
import { CreateInfraAlertDto } from './dto/create-infra-alert.dto';
import { UpdateInfraAlertDto } from './dto/update-infra-alert.dto';

@Injectable()
export class InfraAlertService {
  create(createInfraAlertDto: CreateInfraAlertDto) {
    return 'This action adds a new infraAlert';
  }

  findAll() {
    return `This action returns all infraAlert`;
  }

  findOne(id: number) {
    return `This action returns a #${id} infraAlert`;
  }

  update(id: number, updateInfraAlertDto: UpdateInfraAlertDto) {
    return `This action updates a #${id} infraAlert`;
  }

  remove(id: number) {
    return `This action removes a #${id} infraAlert`;
  }
}
