import { Test, TestingModule } from '@nestjs/testing';
import { DissertacoesTesesService } from './dissertacoes-teses.service';

describe('DissertacoesTesesService', () => {
  let service: DissertacoesTesesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DissertacoesTesesService],
    }).compile();

    service = module.get<DissertacoesTesesService>(DissertacoesTesesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
