// src/grade-curricular/queue/grade-curricular.queue.ts

import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Job } from 'bull';

@Injectable()
export class GradeCurricularQueue {
  constructor(
    @InjectQueue('grade-curricular-queue') private gradeCurricularQueue: Queue,
  ) {}

  // Método para adicionar documentos à fila
  async addToQueue(fileBuffer: Buffer, gradeCurricularId: number) {
    await this.gradeCurricularQueue.add('process-ementa', {
      fileBuffer,
      gradeCurricularId,
    });
  }

  // Método para processar os documentos na fila
  async processFile(job: Job) {
    const { fileBuffer, gradeCurricularId } = job.data;
    console.log('Processando ementa para a grade curricular:', gradeCurricularId);
    // Aqui você pode adicionar lógica para salvar o arquivo, enviar para outro sistema, etc.
  }
}