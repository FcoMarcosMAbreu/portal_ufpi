import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { CreateProcessoSeletivoDto } from './dto/create-processo-seletivo.dto';
import { UpdateProcessoSeletivoDto } from './dto/update-processo-seletivo.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProcessoSeletivoService } from './processos-seletivos.service';

@ApiTags('Processos Seletivos')
@Controller('processos-seletivos')
export class ProcessoSeletivoController {
  constructor(private readonly processoSeletivoService: ProcessoSeletivoService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() createProcessoSeletivoDto: CreateProcessoSeletivoDto) {
    return this.processoSeletivoService.create(createProcessoSeletivoDto);
  }

  @Get()
  findAll() {
    return this.processoSeletivoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.processoSeletivoService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: number, @Body() updateProcessoSeletivoDto: UpdateProcessoSeletivoDto) {
    return this.processoSeletivoService.update(id, updateProcessoSeletivoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: number) {
    return this.processoSeletivoService.remove(id);
  }
}
