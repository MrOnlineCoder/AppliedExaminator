import { Test, TestingModule } from '@nestjs/testing';
import { TestbooksService } from './testbooks.service';

describe('TestbooksService', () => {
  let service: TestbooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestbooksService],
    }).compile();

    service = module.get<TestbooksService>(TestbooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
