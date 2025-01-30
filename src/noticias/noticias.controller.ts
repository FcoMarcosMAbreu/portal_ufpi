// src/noticias/noticias.controller.ts
import { Controller, Post, Get, Param, Patch, Delete, Body, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { NoticiasService } from './noticias.service';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';
import { NoticiaDto } from './dto/noticia.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Notícias')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('noticias')
export class NoticiasController {
  constructor(private readonly noticiasService: NoticiasService) {}

  @Post()
  @UseInterceptors(FileInterceptor('arquivo', {
    limits: {
        fileSize: 10 * 1024 * 1024,
    }
  }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Envie os dados para criar uma nova notícia',
    type: CreateNoticiaDto,
  })
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createNoticiaDto: CreateNoticiaDto): Promise<NoticiaDto> {
    if (file){
        createNoticiaDto.arquivo = file.buffer;
    }
    return this.noticiasService.create(createNoticiaDto);
  }

  @Get()
  findAll(): Promise<NoticiaDto[]> {
    return this.noticiasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<NoticiaDto> {
    return this.noticiasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateNoticiaDto: UpdateNoticiaDto): Promise<NoticiaDto> {
    return this.noticiasService.update(id, updateNoticiaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.noticiasService.remove(id);
  }
}