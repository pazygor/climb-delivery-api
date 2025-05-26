import { Test, TestingModule } from '@nestjs/testing';
import { AlertParamsController } from './alert-params.controller';
import { AlertParamsService } from './alert-params.service';

describe('AlertParamsController', () => {
  let controller: AlertParamsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlertParamsController],
      providers: [AlertParamsService],
    }).compile();

    controller = module.get<AlertParamsController>(AlertParamsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
