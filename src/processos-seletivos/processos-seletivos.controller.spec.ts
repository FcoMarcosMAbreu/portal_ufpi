import { Test, TestingModule } from '@nestjs/testing';
import { ProcessoSeletivoController } from './processos-seletivos.controller';

describe('ProcessosSeletivosController', () => {
  let controller: ProcessoSeletivoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcessoSeletivoController],
    }).compile();

    controller = module.get<ProcessoSeletivoController>(ProcessoSeletivoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
