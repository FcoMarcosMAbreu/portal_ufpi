// src/noticias/noticias.processor.ts
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';

@Injectable()
@Processor('noticias')
export class NoticiasProcessor {
  @Process()
  async handleFileProcessing(job: Job) {
    const { data } = job;
    // Aqui você pode processar o arquivo, como fazer o upload para um serviço de armazenamento
    console.log('Processando a notícia com arquivo:', data);
  }
}