import { Test, TestingModule } from '@nestjs/testing';
import { UserProductSystemService } from './user-product-system.service';

describe('UserProductSystemService', () => {
  let service: UserProductSystemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserProductSystemService],
    }).compile();

    service = module.get<UserProductSystemService>(UserProductSystemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
