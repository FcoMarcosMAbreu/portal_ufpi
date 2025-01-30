// src/grade-curricular/queue/grade-curricular.processor.ts

import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { GradeCurricularQueue } from './grade-curricular.queue';

@Processor('grade-curricular-queue')
export class GradeCurricularProcessor {
  constructor(private readonly gradeCurricularQueue: GradeCurricularQueue) {}

  @Process('process-ementa')
  async processEmenta(job: Job) {
    const { fileBuffer, gradeCurricularId } = job.data;
    // Aqui você pode salvar o arquivo ou fazer outra lógica.
    console.log(`Ementa recebida para a grade curricular ${gradeCurricularId}`);
    // Exemplo: Salvar o arquivo, fazer upload ou qualquer outro processamento necessário.
  }
}