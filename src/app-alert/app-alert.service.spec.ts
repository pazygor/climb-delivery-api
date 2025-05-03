import { Test, TestingModule } from '@nestjs/testing';
import { AppAlertService } from './app-alert.service';

describe('AppAlertService', () => {
  let service: AppAlertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppAlertService],
    }).compile();

    service = module.get<AppAlertService>(AppAlertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
