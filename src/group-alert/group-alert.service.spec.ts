import { Test, TestingModule } from '@nestjs/testing';
import { GroupAlertService } from './group-alert.service';

describe('GroupAlertService', () => {
  let service: GroupAlertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupAlertService],
    }).compile();

    service = module.get<GroupAlertService>(GroupAlertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
