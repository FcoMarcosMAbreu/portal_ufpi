import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCalendarioDto } from './dto/create-calendario.dto';
import { UpdateCalendarioDto } from './dto/update-calendario.dto';
import { Calendario } from './calendario.entity';
Calendario
@Injectable()
export class CalendarioService {
  constructor(
    @InjectRepository(Calendario)
    private readonly calendarioRepository: Repository<Calendario>,
  ) {}

  async create(createCalendarioDto: CreateCalendarioDto): Promise<Calendario> {
    const evento = this.calendarioRepository.create(createCalendarioDto);
    return this.calendarioRepository.save(evento);
  }

  async findAll(): Promise<Calendario[]> {
    return this.calendarioRepository.find();
  }

  async findOne(id: number): Promise<Calendario> {
    const evento = await this.calendarioRepository.findOne({ where: { id } });
    if (!evento) {
      throw new NotFoundException(`Evento com ID ${id} não encontrado`);
    }
    return evento;
  }

  async update(id: number, updateCalendarioDto: UpdateCalendarioDto): Promise<Calendario> {
    await this.findOne(id);
    await this.calendarioRepository.update(id, updateCalendarioDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.calendarioRepository.delete(id);
  }
}
