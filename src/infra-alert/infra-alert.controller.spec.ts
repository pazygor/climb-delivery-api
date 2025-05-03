import { Test, TestingModule } from '@nestjs/testing';
import { InfraAlertController } from './infra-alert.controller';
import { InfraAlertService } from './infra-alert.service';

describe('InfraAlertController', () => {
  let controller: InfraAlertController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InfraAlertController],
      providers: [InfraAlertService],
    }).compile();

    controller = module.get<InfraAlertController>(InfraAlertController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
