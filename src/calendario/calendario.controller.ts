import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CalendarioService } from './calendario.service';
import { CreateCalendarioDto } from './dto/create-calendario.dto';
import { UpdateCalendarioDto } from './dto/update-calendario.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Calendário')
@Controller('calendario')
export class CalendarioController {
  constructor(private readonly calendarioService: CalendarioService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() createCalendarioDto: CreateCalendarioDto) {
    return this.calendarioService.create(createCalendarioDto);
  }

  @Get()
  findAll() {
    return this.calendarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.calendarioService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: number, @Body() updateCalendarioDto: UpdateCalendarioDto) {
    return this.calendarioService.update(id, updateCalendarioDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: number) {
    return this.calendarioService.remove(id);
  }
}
