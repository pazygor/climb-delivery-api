import { Test, TestingModule } from '@nestjs/testing';
import { AlertParamsService } from './alert-params.service';

describe('AlertParamsService', () => {
  let service: AlertParamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlertParamsService],
    }).compile();

    service = module.get<AlertParamsService>(AlertParamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
