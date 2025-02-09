import { ApiProperty } from '@nestjs/swagger';
import { TipoDocumento } from '../tipo-documento.enum';
import { TagDocumento } from '../tag-documento.enum';


export class DocumentoResponseDto {
  @ApiProperty({ description: 'ID do documento', example: 1 })
  id: number;

  @ApiProperty({ description: 'Nome do documento', example: 'Relatório' })
  nome: string;

  @ApiProperty({ description: 'Tipo do documento', enum: TipoDocumento, example: 'PDF' })
  tipo: TipoDocumento;

  @ApiProperty({ description: 'Tag do documento', enum: TagDocumento, example: 'FORMULARIO' })
  tag: TagDocumento;
  
  @ApiProperty({ description: 'Caminho do arquivo', example: '/uploads/documentos/relatorio.pdf' })
  caminho_arquivo: string;

  @ApiProperty({ description: 'Data de criação', example: '2025-01-29T12:00:00.000Z' })
  data_criacao: Date;
}