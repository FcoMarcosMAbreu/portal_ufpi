import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Documento } from './documento.entity';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento';

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

  async update(id: number, updateDocumentoDto: UpdateDocumentoDto): Promise<Documento> {
    const documento = await this.documentosRepository.findOneBy({ id })
    if (!documento){
        throw new NotFoundException(`Documento com o id ${id} não encontrado`);
    }

    const documentoAtualizado =  Object.assign(documento, updateDocumentoDto);
    if (!documentoAtualizado){
        throw new NotFoundException(`Erro ao atualizar: documento com o id ${id} não encontrado`);
    }
    await this.documentosRepository.save(documentoAtualizado);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.documentosRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Documento com id ${id} não encontrado`);
    }
  }
}