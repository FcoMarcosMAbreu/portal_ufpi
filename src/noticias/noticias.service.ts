// src/noticias/noticias.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';
import { Noticia } from './noticia.entity';
import * as fs from 'fs';

@Injectable()
export class NoticiasService {
  constructor(
    @InjectRepository(Noticia)
    private noticiasRepository: Repository<Noticia>) {}

  async create(createNoticiaDto: CreateNoticiaDto): Promise<Noticia> {
    const noticia = this.noticiasRepository.create(createNoticiaDto);
    const savedNoticia = await this.noticiasRepository.save(noticia);
    return savedNoticia;
  }
  
  async downloadDocumento(id: number): Promise<Noticia> {
      const documento = await this.noticiasRepository.findOne({where: { id }});
      if (!documento) {
        throw new NotFoundException(`Documento com id ${id} não encontrado`);
      }
      return documento;
    }

  async findAll(): Promise<Noticia[]> {
    return this.noticiasRepository.find();
  }

  async findOne(id: number): Promise<Noticia> {
    const noticia = await this.noticiasRepository.findOne({where: { id }});
    if (!noticia) {
      throw new NotFoundException(`Notícia com o id ${id} não encontrada`);
    }
    return noticia;
  }

  async update(id: number, updateNoticiaDto: UpdateNoticiaDto): Promise<Noticia> {
    const noticia = await this.noticiasRepository.findOne({where: { id }});
    if (!noticia) {
      throw new NotFoundException(`Notícia com o id ${id} não encontrada`);
    }

    Object.assign(noticia, updateNoticiaDto);
    return this.noticiasRepository.save(noticia);
  }

  async remove(id: number): Promise<void> {
    const noticia = await this.findOne(id);

    fs.unlink(noticia.arquivo, (err) => {
      if (err){
        console.log('Erro ao deletar o arquivo: ', err);
      }
    })

    const result = await this.noticiasRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Documento com id ${id} não encontrado`)
    }
  }
}