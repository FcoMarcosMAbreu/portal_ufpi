import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GradeCurricular } from './grade-curricular.entity';
import { CreateGradeCurricularDto } from './dto/create-grade-curricular.dto';
import { UpdateGradeCurricularDto } from './dto/update-grade-curricular.dto';
import { GradeCurricularQueue } from './grade-curricular.queue';

@Injectable()
export class GradeCurricularService {
  constructor(
    @InjectRepository(GradeCurricular)
    private gradeCurricularRepository: Repository<GradeCurricular>,
    private readonly gradeCurricularQueue: GradeCurricularQueue,
  ) {}

  async create(createGradeCurricularDto: CreateGradeCurricularDto): Promise<GradeCurricular> {
    // Cria o objeto da grade curricular, sem a ementa, pois ela será processada posteriormente
    const gradeCurricular = this.gradeCurricularRepository.create({
      titulo: createGradeCurricularDto.titulo,
      codigo: createGradeCurricularDto.codigo,
      componente_curricular: createGradeCurricularDto.componente_curricular,
      carga_horaria: createGradeCurricularDto.carga_horaria,
      data_criacao: createGradeCurricularDto.data_criacao,
    });

    // Salva a grade curricular no banco de dados
    const savedGradeCurricular = await this.gradeCurricularRepository.save(gradeCurricular);

    // Se o arquivo de ementa for fornecido, coloca na fila para processamento posterior
    if (createGradeCurricularDto.ementa) {
      await this.gradeCurricularQueue.addToQueue(createGradeCurricularDto.ementa.buffer, savedGradeCurricular.id);
    }

    return savedGradeCurricular;
  }

  async findAll(): Promise<GradeCurricular[]> {
    return this.gradeCurricularRepository.find();
  }

  async findOne(id: number): Promise<GradeCurricular> {
    const gradeCurricular = await this.gradeCurricularRepository.findOne({where:{id}});
    if (!gradeCurricular) {
      throw new NotFoundException(`Grade curricular com o id ${id} não encontrada`);
    }
    return gradeCurricular;
  }

  async update(id: number, updateGradeCurricularDto: UpdateGradeCurricularDto): Promise<GradeCurricular> {
    await this.findOne(id);
    await this.gradeCurricularRepository.update(id, updateGradeCurricularDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const gradeCurricular = await this.findOne(id);
    await this.gradeCurricularRepository.remove(gradeCurricular);
  }
}