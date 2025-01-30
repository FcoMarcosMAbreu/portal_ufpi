import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Documento } from './documento.entity';
import { DocumentosService } from './documentos.service';

@Processor('documento-queue')
export class DocumentoProcessor {
  constructor(private readonly documentosService: DocumentosService) {}

  @Process()
  async processDocumentUpload(job: Job) {
    const { tipo, arquivo, nome } = job.data;
    const documento = new Documento();
    documento.tipo = tipo;
    documento.arquivo = arquivo;
    documento.nome = nome;
    documento.data_criacao = new Date();

    return await this.documentosService.create(documento);
  }
}