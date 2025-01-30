// src/noticias/noticias.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';
import { Noticia } from './noticia.entity';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class NoticiasService {
  constructor(
    @InjectRepository(Noticia)
    private noticiasRepository: Repository<Noticia>,
    @InjectQueue('noticias') private noticiasQueue: Queue,
  ) {}

  async create(createNoticiaDto: CreateNoticiaDto): Promise<Noticia> {
    const noticia = this.noticiasRepository.create(createNoticiaDto);
    const savedNoticia = await this.noticiasRepository.save(noticia);

    // Enviar para a fila para processar o arquivo
    if (createNoticiaDto.arquivo) {
      await this.noticiasQueue.add({
        noticiaId: savedNoticia.id,
        arquivo: createNoticiaDto.arquivo,
      });
    }

    return savedNoticia;
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
    await this.noticiasRepository.remove(noticia);
  }
}