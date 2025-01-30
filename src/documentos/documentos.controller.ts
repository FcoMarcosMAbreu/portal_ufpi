import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, UploadedFile, UseInterceptors, HttpException, HttpStatus, MaxFileSizeValidator } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { DocumentosService } from './documentos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { TipoDocumento } from './tipo-documento.enum';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';


@ApiTags('Documentos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('documentos')
export class DocumentosController {
  constructor(private readonly documentosService: DocumentosService,
    @InjectQueue('documento-queue') private readonly documentoQueue: Queue,
  ){}


  @Post()
  @UseInterceptors(FileInterceptor('arquivo', {
    limits: {
      fileSize: 10 * 1024 * 1024,
    }
  }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Envie um arquivo para o documento',
    type: CreateDocumentoDto, // DTO que representa os dados do corpo, além do arquivo
  })
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createDocumentoDto: CreateDocumentoDto) {
      if (!file){
        throw new HttpException('Arquivo não encontrado', HttpStatus.BAD_REQUEST);
      }

      try {
        createDocumentoDto.tipo = this.getTipoDocumento(file.mimetype); // Detecta o tipo do documento  
        createDocumentoDto.arquivo = file.buffer;
    
        return this.documentosService.create(createDocumentoDto);
      } catch (error) {
        throw new HttpException('Erro ao processar o arquivo', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      
  }

  @Get()
  findAll() {
    return this.documentosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDocumentoDto: UpdateDocumentoDto) {
    return this.documentosService.update(+id, updateDocumentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentosService.remove(+id);
  }

  private getTipoDocumento(mimetype: string): TipoDocumento {
    if (mimetype.includes('pdf')) return TipoDocumento.PDF;
    if (mimetype.includes('word')) return TipoDocumento.DOCX;
    if (mimetype.startsWith('image')) return TipoDocumento.Imagem;
    return TipoDocumento.Outro; // Tipo genérico para outros arquivos
  }
}