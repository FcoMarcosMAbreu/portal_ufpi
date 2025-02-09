import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GradeCurricular } from './grade-curricular.entity';
import { CreateGradeCurricularDto } from './dto/create-grade-curricular.dto';
import { UpdateGradeCurricularDto } from './dto/update-grade-curricular.dto';

@Injectable()
export class GradeCurricularService {
  constructor(
    @InjectRepository(GradeCurricular)
    private gradeCurricularRepository: Repository<GradeCurricular>) {}

  async create(createGradeCurricularDto: CreateGradeCurricularDto): Promise<GradeCurricular> {
    // Cria o objeto da grade curricular, sem a ementa, pois ela será processada posteriormente
    const gradeCurricular = this.gradeCurricularRepository.create({
      titulo: createGradeCurricularDto.titulo,
      codigo: createGradeCurricularDto.codigo,
      componente_curricular: createGradeCurricularDto.componente_curricular,
      ementa: createGradeCurricularDto.ementa,
      carga_horaria: createGradeCurricularDto.carga_horaria,
      data_criacao: createGradeCurricularDto.data_criacao,
    });

    // Salva a grade curricular no banco de dados
    const savedGradeCurricular = await this.gradeCurricularRepository.save(gradeCurricular);

    return savedGradeCurricular;
  }

  async downloadDocumento(id: number): Promise<GradeCurricular> {
        const documento = await this.gradeCurricularRepository.findOne({where: { id }});
        if (!documento) {
          throw new NotFoundException(`Documento com id ${id} não encontrado`);
        }
        return documento;
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