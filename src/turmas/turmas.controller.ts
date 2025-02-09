import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
    Put,
  } from '@nestjs/common';
  import { TurmasService } from './turmas.service';
  import { CreateTurmaDto } from './dto/create-turma.dto';
  import { UpdateTurmaDto } from './dto/update-turma.dto';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
  
  @ApiTags('Turmas')
  @Controller('turmas')
  export class TurmasController {
    constructor(private readonly turmasService: TurmasService) {}
  
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    create(@Body() createTurmaDto: CreateTurmaDto) {
      return this.turmasService.create(createTurmaDto);
    }
  
    @Get()
    findAll() {
      return this.turmasService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.turmasService.findOne(+id);
    }
  
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    update(@Param('id') id: string, @Body() updateTurmaDto: UpdateTurmaDto) {
      return this.turmasService.update(+id, updateTurmaDto);
    }
  
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    remove(@Param('id') id: string) {
      return this.turmasService.remove(+id);
    }
  }
  