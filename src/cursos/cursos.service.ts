import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Curso } from './curso.entity';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { CursoResponseDto } from './dto/curso-response.dto';

@Injectable()
export class CursosService {
  constructor(
    @InjectRepository(Curso)
    private cursosRepository: Repository<Curso>,
  ) {}

  async create(createCursoDto: CreateCursoDto): Promise<CursoResponseDto> {
    const curso = this.cursosRepository.create(createCursoDto);
    const savedCurso = await this.cursosRepository.save(curso);
    return this.toCursoResponseDto(savedCurso);
  }

  async findAll(): Promise<CursoResponseDto[]> {
    const cursos = await this.cursosRepository.find();
    return cursos.map(this.toCursoResponseDto);
  }

  async findOne(id: number): Promise<CursoResponseDto> {
    const curso = await this.cursosRepository.findOne({ where: { id } });
    if (!curso) {
      throw new NotFoundException(`Curso com ID ${id} não encontrado`);
    }
    return this.toCursoResponseDto(curso);
  }

  async update(id: number, updateCursoDto: UpdateCursoDto): Promise<CursoResponseDto> {
    const curso = await this.cursosRepository.findOneBy({ id })
    if (!curso){
        throw new NotFoundException(`Curso com o id ${id} não encontrado`);
    }
    await this.cursosRepository.update(id, updateCursoDto);
    const cursoAtualizado = await this.cursosRepository.findOne({ where: { id } });
    if (!cursoAtualizado){
        throw new NotFoundException(`Erro ao atualizar: curso com o id ${id} não encontrado`);
    }
    return this.toCursoResponseDto(cursoAtualizado);
  }

  async remove(id: number): Promise<void> {
    const curso = await this.findOne(id);
    await this.cursosRepository.remove(curso);
  }

  private toCursoResponseDto(curso: Curso): CursoResponseDto {
    return {
      id: curso.id,
      nome: curso.nome,
      link_documento_capes: curso.link_documento_capes,
      link_detalhes_curso: curso.link_detalhes_curso,
      data_criacao: curso.data_criacao,
    };
  }
}