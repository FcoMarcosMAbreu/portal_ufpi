import { ApiProperty } from '@nestjs/swagger';
import { TipoDocumento } from '../tipo-documento.enum';

export class CreateDocumentoDto {
  @ApiProperty({ description: 'Nome do documento', example: 'Relatório de vendas' })
  nome: string;

  @ApiProperty({ description: 'Tipo do documento', example: 'PDF' })
  tipo: TipoDocumento; // Usando o enum diretamente

  @ApiProperty({ description: 'Arquivo do documento', type: 'string', format: 'binary' })
  caminho_arquivo: any;
}
