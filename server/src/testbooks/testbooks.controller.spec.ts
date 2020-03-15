import { Test, TestingModule } from '@nestjs/testing';
import { TestbooksController } from './testbooks.controller';

describe('Testbooks Controller', () => {
  let controller: TestbooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestbooksController],
    }).compile();

    controller = module.get<TestbooksController>(TestbooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
