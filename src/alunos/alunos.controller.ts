import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { AlunosService } from './alunos.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Alunos')
@Controller('alunos')
export class AlunosController {
  constructor(private readonly alunosService: AlunosService) {}

  @Post()
  @UseGuards(JwtAuthGuard) // Protege a rota para admins autenticados
  @ApiBearerAuth() // Requer autenticação via token JWT
  create(@Body() createAlunoDto: CreateAlunoDto) {
    return this.alunosService.create(createAlunoDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard) // Protege a rota para admins autenticados
  @ApiBearerAuth()
  findAll() {
    return this.alunosService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard) // Protege a rota para admins autenticados
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.alunosService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard) // Protege a rota para admins autenticados
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateAlunoDto: UpdateAlunoDto) {
    return this.alunosService.update(+id, updateAlunoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard) // Protege a rota para admins autenticados
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.alunosService.remove(+id);
  }
}