import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProcessoSeletivoDto } from './dto/create-processo-seletivo.dto';
import { UpdateProcessoSeletivoDto } from './dto/update-processo-seletivo.dto';
import { ProcessoSeletivo } from './processos-seletivos.entity';


@Injectable()
export class ProcessoSeletivoService {
  constructor(
    @InjectRepository(ProcessoSeletivo)
    private readonly processoSeletivoRepository: Repository<ProcessoSeletivo>,
  ) {}

  async create(createProcessoSeletivoDto: CreateProcessoSeletivoDto): Promise<ProcessoSeletivo> {
    const processo = this.processoSeletivoRepository.create(createProcessoSeletivoDto);
    return this.processoSeletivoRepository.save(processo);
  }

  async findAll(): Promise<ProcessoSeletivo[]> {
    return this.processoSeletivoRepository.find();
  }

  async findOne(id: number): Promise<ProcessoSeletivo> {
    const processo = await this.processoSeletivoRepository.findOne({ where: { id } });
    if (!processo) {
      throw new NotFoundException(`Processo seletivo com ID ${id} não encontrado`);
    }
    return processo;
  }

  async update(id: number, updateProcessoSeletivoDto: UpdateProcessoSeletivoDto): Promise<ProcessoSeletivo> {
    await this.findOne(id);
    await this.processoSeletivoRepository.update(id, updateProcessoSeletivoDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.processoSeletivoRepository.delete(id);
  }
}
