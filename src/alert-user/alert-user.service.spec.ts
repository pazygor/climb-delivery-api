import { Test, TestingModule } from '@nestjs/testing';
import { AlertUserService } from './alert-user.service';

describe('AlertUserService', () => {
  let service: AlertUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlertUserService],
    }).compile();

    service = module.get<AlertUserService>(AlertUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
