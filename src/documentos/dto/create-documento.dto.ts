import { ApiProperty } from '@nestjs/swagger';
import { TipoDocumento } from '../tipo-documento.enum';
import { TagDocumento } from '../tag-documento.enum';

export class CreateDocumentoDto {
  @ApiProperty({ description: 'Nome do documento', example: 'Relatório de vendas' })
  nome: string;

  @ApiProperty({ 
    description: 'Tipo do documento',
    enum: TipoDocumento,
    example: 'PDF',
    enumName: 'TipoDocumento',
   })
  tipo: TipoDocumento; // Usando o enum diretamente

  @ApiProperty({ 
    description: 'Tag do documento', 
    enum: TagDocumento, 
    example: 'FORMULARIO',
    enumName: 'TagDocumento', })
  tag: TagDocumento;

  @ApiProperty({ description: 'Arquivo do documento', type: 'string', format: 'binary' })
  caminho_arquivo: any;
}
