import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentoDto } from './create-documento.dto';
import { ApiProperty } from '@nestjs/swagger';
import { TipoDocumento } from '../tipo-documento.enum';
import { TagDocumento } from '../tag-documento.enum';

export class UpdateDocumentoDto extends PartialType(CreateDocumentoDto) {
  @ApiProperty({ description: 'Nome do documento', example: 'Novo Relatório' })
  nome?: string;

  @ApiProperty({ description: 'Tipo do documento', enum: TipoDocumento, example: 'DOCX' })
  tipo?: TipoDocumento;

  @ApiProperty({ description: 'Tag do documento', enum: TagDocumento, example: 'RESOLUCAO' })
  tag?: TagDocumento;

  @ApiProperty({ description: 'Arquivo do documento atualizado', example: 'binary' })
  caminho_arquivo?: string;
}