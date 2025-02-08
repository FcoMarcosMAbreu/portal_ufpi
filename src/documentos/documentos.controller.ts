import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, UploadedFile, UseInterceptors, HttpException, HttpStatus, MaxFileSizeValidator, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DocumentosService } from './documentos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { TipoDocumento } from './tipo-documento.enum';


@ApiTags('Documentos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('documentos')
export class DocumentosController {
  constructor(private readonly documentosService: DocumentosService){}


  @Post()
  @UseInterceptors(FileInterceptor('arquivo', {
    storage: diskStorage({
      destination: "./uploads/documentos",
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() *1e9);
        const ext = extname(file.originalname);
        callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      }
    }),
    limits: { fileSize: 10 * 1024 * 1024}
  }))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Faz upload e cria um documento' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nome: { type: 'string', example: 'Relatório de vendas' },
        tipo: { type: 'string', example: 'PDF' },
        arquivo: { type: 'string', format: 'binary' }
      }
    }
  })
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createDocumentoDto: CreateDocumentoDto) {
      if (!file){
        throw new HttpException('Arquivo não encontrado', HttpStatus.BAD_REQUEST);
      }

      const tipoDocumento = this.getTipoDocumento(file.mimetype);
      const caminhoArquivo = `uploads/documentos/${file.filename}`;

      return this.documentosService.create({
        nome: createDocumentoDto.nome,
        tipo: tipoDocumento,
        caminho_arquivo: caminhoArquivo
      })
      
  }

  @Get()
  findAll() {
    return this.documentosService.findAll();
  }

  @Get(':id/download')
  async downloadDocumento(@Param('id') id: string, @Res() res) {
    const documento = await this.documentosService.downloadDocumento(+id);

    if (!documento){
      throw new HttpException('Documento não encontrado', HttpStatus.NOT_FOUND);
    }

    res.download(documento.caminho_arquivo);
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