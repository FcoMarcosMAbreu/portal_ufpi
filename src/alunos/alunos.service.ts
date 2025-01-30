import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aluno } from './alunos.entity';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { AlunoResponseDto } from './dto/aluno-response.dto';

@Injectable()
export class AlunosService {
  constructor(
    @InjectRepository(Aluno)
    private alunosRepository: Repository<Aluno>,
  ) {}

  async create(createAlunoDto: CreateAlunoDto): Promise<Aluno> {
    const aluno = this.alunosRepository.create(createAlunoDto);
    return this.alunosRepository.save(aluno);
  }

  async findAll(): Promise<Aluno[]> {
    return this.alunosRepository.find();
  }

  async findOne(id: number): Promise<AlunoResponseDto> {
    const aluno = await this.alunosRepository.findOneBy({ id });
    if (!aluno) {
        throw new NotFoundException(`Aluno com o id ${id} não encontrado`);
    }
    return this.toAlunoResponseDto(aluno);

  }

  async update(id: number, updateAlunoDto: UpdateAlunoDto): Promise<AlunoResponseDto> {
    const aluno = await this.alunosRepository.findOneBy({ id });
    if (!aluno) {
      throw new NotFoundException(`Aluno com o id ${id} não encontrado`);
    }
    await this.alunosRepository.update(id, updateAlunoDto);
    const alunoAtualizado = await this.alunosRepository.findOneBy({ id });
    if (!alunoAtualizado) {
        throw new NotFoundException(`Erro ao atualizar: aluno com o id ${id} não encontrado`);
      }
    
    return this.toAlunoResponseDto(alunoAtualizado);
  }

  async remove(id: number): Promise<void> {
    await this.alunosRepository.delete(id);
  }

  private toAlunoResponseDto(aluno: Aluno): AlunoResponseDto {
    return {
      id: aluno.id,
      nome: aluno.nome,
      email: aluno.email,
      matricula: aluno.matricula,
      curso: aluno.curso
    };
}}