import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { CursoResponseDto } from './dto/curso-response.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Cursos')
@Controller('cursos')
export class CursosController {
  constructor(private readonly cursosService: CursosService) {}

  @Post()
  @UseGuards(JwtAuthGuard) // Protege a rota para admins autenticados
  @ApiBearerAuth() // Requer autenticação via token JWT
  create(@Body() createCursoDto: CreateCursoDto): Promise<CursoResponseDto> {
    return this.cursosService.create(createCursoDto);
  }

  @Get()
  //@UseGuards(JwtAuthGuard) // Protege a rota para admins autenticados
  //@ApiBearerAuth() // Requer autenticação via token JWT
  findAll(): Promise<CursoResponseDto[]> {
    return this.cursosService.findAll();
  }

  @Get(':id')
  //@UseGuards(JwtAuthGuard) // Protege a rota para admins autenticados
  //@ApiBearerAuth() // Requer autenticação via token JWT
  findOne(@Param('id') id: number): Promise<CursoResponseDto> {
    return this.cursosService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard) // Protege a rota para admins autenticados
  @ApiBearerAuth() // Requer autenticação via token JWT
  update(@Param('id') id: number, @Body() updateCursoDto: UpdateCursoDto): Promise<CursoResponseDto> {
    return this.cursosService.update(id, updateCursoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard) // Protege a rota para admins autenticados
  @ApiBearerAuth() // Requer autenticação via token JWT
  remove(@Param('id') id: number): Promise<void> {
    return this.cursosService.remove(id);
  }
}