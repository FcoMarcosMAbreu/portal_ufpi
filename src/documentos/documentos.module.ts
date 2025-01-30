import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentosService } from './documentos.service';
import { DocumentosController } from './documentos.controller';
import { Documento } from './documento.entity';
import { BullModule } from '@nestjs/bull';
import { DocumentoProcessor } from './documento.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([Documento]),
    BullModule.registerQueue({
      name: 'documento-queue',
    }),
],
  controllers: [DocumentosController],
  providers: [DocumentosService, DocumentoProcessor],
  exports: [DocumentosService],
})
export class DocumentosModule {}