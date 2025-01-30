import { Test, TestingModule } from '@nestjs/testing';
import { GradeCurricularController } from './grade-curricular.controller';

describe('GradeCurricularController', () => {
  let controller: GradeCurricularController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GradeCurricularController],
    }).compile();

    controller = module.get<GradeCurricularController>(GradeCurricularController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
