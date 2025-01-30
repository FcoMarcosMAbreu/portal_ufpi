import { Test, TestingModule } from '@nestjs/testing';
import { DissertacoesTesesController } from './dissertacoes-teses.controller';

describe('DissertacoesTesesController', () => {
  let controller: DissertacoesTesesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DissertacoesTesesController],
    }).compile();

    controller = module.get<DissertacoesTesesController>(DissertacoesTesesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
