import { Test, TestingModule } from '@nestjs/testing';
import { AppAlertController } from './app-alert.controller';
import { AppAlertService } from './app-alert.service';

describe('AppAlertController', () => {
  let controller: AppAlertController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppAlertController],
      providers: [AppAlertService],
    }).compile();

    controller = module.get<AppAlertController>(AppAlertController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
