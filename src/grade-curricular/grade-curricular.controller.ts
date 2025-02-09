import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, UploadedFile, UseInterceptors, HttpException, HttpStatus, BadRequestException, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { GradeCurricularService } from './grade-curricular.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateGradeCurricularDto } from './dto/create-grade-curricular.dto';
import { UpdateGradeCurricularDto } from './dto/update-grade-curricular.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { GradeCurricularDto } from './dto/grade-curricular.dto';
import { diskStorage } from 'multer';
import { callbackify } from 'util';
import { extname } from 'path';

@ApiTags('Grade Curricular')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('grade-curricular')
export class GradeCurricularController {
  constructor(private readonly gradeCurricularService: GradeCurricularService) {}

  @Post()
  @UseInterceptors(FileInterceptor('ementa', {
    storage: diskStorage({
      destination: './uploads/grade-curricular',
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
  @ApiBody({
    description: 'Envie os dados para criar uma nova grade curricular',
    type: CreateGradeCurricularDto,
  })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createGradeCurricularDto: CreateGradeCurricularDto,
  ): Promise<GradeCurricularDto> {
    if (file && file.size > 10 * 1024 * 1024){
      throw new BadRequestException('O arquivo excede o limite de 10 MB');
    }
    
    if (!file) {
      throw new HttpException('Arquivo não encontrado', HttpStatus.BAD_REQUEST);
    }
    
    createGradeCurricularDto.ementa = `uploads/grade-curricular/${file.filename}`;

    return this.gradeCurricularService.create(createGradeCurricularDto);
  }

  @Get()
  findAll() {
    return this.gradeCurricularService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gradeCurricularService.findOne(+id);
  }

  @Get(':id/download')
      async downloadDocumento(@Param('id') id: string, @Res() res) {
        const documento = await this.gradeCurricularService.downloadDocumento(+id);
    
        if (!documento){
          throw new HttpException('Documento não encontrado', HttpStatus.NOT_FOUND);
        }
    
        res.download(documento.ementa);
      }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGradeCurricularDto: UpdateGradeCurricularDto) {
    return this.gradeCurricularService.update(+id, updateGradeCurricularDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gradeCurricularService.remove(+id);
  }
}