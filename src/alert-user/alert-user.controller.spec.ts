import { Test, TestingModule } from '@nestjs/testing';
import { AlertUserController } from './alert-user.controller';
import { AlertUserService } from './alert-user.service';

describe('AlertUserController', () => {
  let controller: AlertUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlertUserController],
      providers: [AlertUserService],
    }).compile();

    controller = module.get<AlertUserController>(AlertUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
