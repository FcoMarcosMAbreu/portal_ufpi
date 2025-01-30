import { Test, TestingModule } from '@nestjs/testing';
import { GradeCurricularService } from './grade-curricular.service';

describe('GradeCurricularService', () => {
  let service: GradeCurricularService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GradeCurricularService],
    }).compile();

    service = module.get<GradeCurricularService>(GradeCurricularService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
