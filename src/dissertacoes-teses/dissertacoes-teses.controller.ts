import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DissertacoesTesesService } from './dissertacoes-teses.service';
import { UpdateDissertacaoTeseDto } from './dto/update-dissertacao-tese.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateDissertacaoTeseDto } from './dto/create-disseracao-tese.dto';


@ApiTags('Dissertações e Teses')
@Controller('dissertacoes-teses')
export class DissertacoesTesesController {
  constructor(private readonly dissertacoesTesesService: DissertacoesTesesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() createDissertacaoTeseDto: CreateDissertacaoTeseDto) {
    return this.dissertacoesTesesService.create(createDissertacaoTeseDto);
  }

  @Get()
  findAll() {
    return this.dissertacoesTesesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.dissertacoesTesesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: number, @Body() updateDissertacaoTeseDto: UpdateDissertacaoTeseDto) {
    return this.dissertacoesTesesService.update(id, updateDissertacaoTeseDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: number) {
    return this.dissertacoesTesesService.remove(id);
  }
}
