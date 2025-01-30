import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTurmaDto } from './dto/create-turma.dto';
import { UpdateTurmaDto } from './dto/update-turma.dto';
import { Turma } from './turma.entity';

@Injectable()
export class TurmasService {
  constructor(
    @InjectRepository(Turma)
    private readonly turmasRepository: Repository<Turma>,
  ) {}

  async create(createTurmaDto: CreateTurmaDto): Promise<Turma> {
    const turma = this.turmasRepository.create(createTurmaDto);
    return this.turmasRepository.save(turma);
  }

  async findAll(): Promise<Turma[]> {
    return this.turmasRepository.find();
  }

  async findOne(id: number): Promise<Turma> {
    const turma = await this.turmasRepository.findOne({ where: { id } });
    if (!turma) {
      throw new NotFoundException(`Turma com o id ${id} não encontrada`);
    }
    return turma;
  }

  async update(id: number, updateTurmaDto: UpdateTurmaDto): Promise<Turma> {
    await this.findOne(id); 
    await this.turmasRepository.update(id, updateTurmaDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.turmasRepository.delete(id);
  }
}
