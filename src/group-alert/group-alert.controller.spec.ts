import { Test, TestingModule } from '@nestjs/testing';
import { GroupAlertController } from './group-alert.controller';
import { GroupAlertService } from './group-alert.service';

describe('GroupAlertController', () => {
  let controller: GroupAlertController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupAlertController],
      providers: [GroupAlertService],
    }).compile();

    controller = module.get<GroupAlertController>(GroupAlertController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
