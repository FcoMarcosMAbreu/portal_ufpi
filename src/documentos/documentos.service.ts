import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Documento } from './documento.entity';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento';
import * as fs from 'fs';

@Injectable()
export class DocumentosService {
  constructor(
    @InjectRepository(Documento)
    private readonly documentosRepository: Repository<Documento>,
  ) {}

  async create(createDocumentoDto: CreateDocumentoDto): Promise<Documento> {
    const documento = this.documentosRepository.create(createDocumentoDto);
    return this.documentosRepository.save(documento);
  }

  async findAll(): Promise<Documento[]> {
    return this.documentosRepository.find();
  }

  async findOne(id: number): Promise<Documento> {
    const documento = await this.documentosRepository.findOneBy({ id });
    if (!documento) {
      throw new NotFoundException(`Documento com id ${id} não encontrado`);
    }
    return documento;
  }

  async downloadDocumento(id: number): Promise<Documento> {
    const documento = await this.documentosRepository.findOne({where: { id }});
    if (!documento) {
      throw new NotFoundException(`Documento com id ${id} não encontrado`);
    }
    return documento;
  }

  async update(id: number, updateDocumentoDto: UpdateDocumentoDto): Promise<Documento> {
    const documento = await this.documentosRepository.findOneBy({ id })
    if (!documento){
        throw new NotFoundException(`Documento com o id ${id} não encontrado`);
    }

    Object.assign(documento, updateDocumentoDto);
    return this.documentosRepository.save(documento);
  }

  async remove(id: number): Promise<void> {
    const documento = await this.findOne(id);

    fs.unlink(documento.caminho_arquivo, (err) => {
      if (err) {
        console.log('Erro ao deletar o arquivo: ', err);
      }
    });

    const result = await this.documentosRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Documento com id ${id} não encontrado`)
    }
  }
}