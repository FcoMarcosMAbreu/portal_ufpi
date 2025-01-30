// src/professores/professores.controller.ts
import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProfessoresService } from './professores.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { ProfessorResponseDto } from './dto/professor-response.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Professores')
@Controller('professores')
export class ProfessoresController {
  constructor(private readonly professoresService: ProfessoresService) {}

  @Post()
  @UseGuards(JwtAuthGuard) // Protege a rota para admins autenticados
  @ApiBearerAuth() // Requer autenticação via token JWT
  async create(@Body() createProfessorDto: CreateProfessorDto): Promise<ProfessorResponseDto> {
    try {
      return this.professoresService.create(createProfessorDto);
    } catch (error) {
      throw new BadRequestException('Dados inválidos');
    }

  }

  @Get()
  @UseGuards(JwtAuthGuard) // Protege a rota para admins autenticados
  @ApiBearerAuth() // Requer autenticação via token JWT
  async findAll(): Promise<ProfessorResponseDto[]> {
    return this.professoresService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard) // Protege a rota para admins autenticados
  @ApiBearerAuth() // Requer autenticação via token JWT
  async findOne(@Param('id') id: number): Promise<ProfessorResponseDto> {
    return this.professoresService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard) // Protege a rota para admins autenticados
  @ApiBearerAuth() // Requer autenticação via token JWT
  async update(
    @Param('id') id: number,
    @Body() updateProfessorDto: UpdateProfessorDto,
  ): Promise<ProfessorResponseDto> {
    return this.professoresService.update(id, updateProfessorDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard) // Protege a rota para admins autenticados
  @ApiBearerAuth() // Requer autenticação via token JWT
  async remove(@Param('id') id: number): Promise<void> {
    return this.professoresService.remove(id);
  }
}