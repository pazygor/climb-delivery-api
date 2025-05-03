import { Test, TestingModule } from '@nestjs/testing';
import { InfraAlertService } from './infra-alert.service';

describe('InfraAlertService', () => {
  let service: InfraAlertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InfraAlertService],
    }).compile();

    service = module.get<InfraAlertService>(InfraAlertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
