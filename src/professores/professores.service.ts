// src/professores/professores.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { ProfessorResponseDto } from './dto/professor-response.dto';
import { Professor } from './professores.entity';
import { Nivel, Vinculo } from './professores.enum';

@Injectable()
export class ProfessoresService {
  constructor(
    @InjectRepository(Professor)
    private professoresRepository: Repository<Professor>,
  ) {}

  async create(createProfessorDto: CreateProfessorDto): Promise<ProfessorResponseDto> {
    if (!Object.values(Nivel).includes(createProfessorDto.nivel)) {
      throw new BadRequestException('Nivel inválido. Valores permitidos: GRADUACAO, MESTRADO, DOUTORADO, PHD ',);
    }

    if (!Object.values(Vinculo).includes(createProfessorDto.vinculo)) {
      throw new BadRequestException('Vinculo inválido. Valores permitidos: TEMPORARIO, EFETIVO, COLABORADOR');
    }

    const professor = this.professoresRepository.create(createProfessorDto);
    const savedProfessor = await this.professoresRepository.save(professor);
    return this.toProfessorResponseDto(savedProfessor);
  }

  async findAll(): Promise<ProfessorResponseDto[]> {
    const professores = await this.professoresRepository.find();
    return professores.map(this.toProfessorResponseDto);
  }

  async findOne(id: number): Promise<ProfessorResponseDto> {
    const professor = await this.professoresRepository.findOneBy({ id });
    if (!professor) {
      throw new NotFoundException(`Professor com o id ${id} não encontrado`);
    }
    return this.toProfessorResponseDto(professor);
  }

  async update(id: number, updateProfessorDto: UpdateProfessorDto): Promise<ProfessorResponseDto> {
    const professor = await this.professoresRepository.findOneBy({ id });
    if (!professor) {
      throw new NotFoundException(`Professor com o id ${id} não encontrado`);
    }
    await this.professoresRepository.update(id, updateProfessorDto);
    const professorAtualizado = await this.professoresRepository.findOneBy({ id });
    if (!professorAtualizado){
      throw new NotFoundException(`Erro ao atualizar: professor com o id ${id} não encontrado`);
    }
    return this.toProfessorResponseDto(professorAtualizado);
  }

  async remove(id: number): Promise<void> {
    const professor = await this.professoresRepository.findOneBy({ id });
    if (!professor) {
      throw new NotFoundException(`Professor com o id ${id} não encontrado`);
    }
    await this.professoresRepository.delete(id);
  }

  private toProfessorResponseDto(professor: Professor): ProfessorResponseDto {
    const { id, nome, matricula, email, nivel, telefone, curriculo_lattes, vinculo, data_criacao } = professor;
    const professorResponseDto = new ProfessorResponseDto();
    professorResponseDto.id = id;
    professorResponseDto.nome = nome;
    professorResponseDto.matricula = matricula;
    professorResponseDto.email = email;
    professorResponseDto.nivel = nivel;
    professorResponseDto.telefone = telefone;
    professorResponseDto.curriculo_lattes = curriculo_lattes;
    professorResponseDto.vinculo = vinculo;
    professorResponseDto.data_criacao = data_criacao;
    return professorResponseDto;
  }
}