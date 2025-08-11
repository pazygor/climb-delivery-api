import { Test, TestingModule } from '@nestjs/testing';
import { UserProductSystemController } from './user-product-system.controller';
import { UserProductSystemService } from './user-product-system.service';

describe('UserProductSystemController', () => {
  let controller: UserProductSystemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserProductSystemController],
      providers: [UserProductSystemService],
    }).compile();

    controller = module.get<UserProductSystemController>(UserProductSystemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
