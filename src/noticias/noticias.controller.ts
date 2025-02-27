// src/noticias/noticias.controller.ts
import { Controller, Post, Get, Param, Patch, Delete, Body, UseGuards, UseInterceptors, UploadedFile, BadRequestException, Res, HttpException, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiBody, ApiConsumes, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { NoticiasService } from './noticias.service';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';
import { NoticiaDto } from './dto/noticia.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@ApiTags('Notícias')
@Controller('noticias')
export class NoticiasController {
  constructor(private readonly noticiasService: NoticiasService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('arquivo', {
    storage: diskStorage({
      destination: './uploads/noticias',
      filename: (req, arquivo, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(arquivo.originalname);
        callback(null, `${uniqueSuffix}${ext}`);
      }
    }),
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  }))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Faz upload e cria um documento' })
  @ApiBody({
    description: 'Envie os dados para criar uma nova notícia',
    type: CreateNoticiaDto,
  })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createNoticiaDto: CreateNoticiaDto): Promise<NoticiaDto> {
    if (file && file.size > 10 * 1024 * 1024){
      throw new BadRequestException('O arquivo excede o limite de 10 MB');
    }

    createNoticiaDto.arquivo = file ? `uploads/noticias/${file.filename}` : "Sem arquivo";
    
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

  @Get(':id/download')
    async downloadDocumento(@Param('id') id: string, @Res() res) {
      const documento = await this.noticiasService.downloadDocumento(+id);
  
      if (!documento){
        throw new HttpException('Documento não encontrado', HttpStatus.NOT_FOUND);
      }
  
      res.download(documento.arquivo);
    }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: number, @Body() updateNoticiaDto: UpdateNoticiaDto): Promise<NoticiaDto> {
    return this.noticiasService.update(id, updateNoticiaDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: number): Promise<void> {
    return this.noticiasService.remove(id);
  }
}