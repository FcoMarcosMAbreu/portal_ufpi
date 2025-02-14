import { ApiProperty } from "@nestjs/swagger";

export class CursoResponseDto {
    @ApiProperty({ description: 'ID do curso', example: 1 })
    id: number;

    @ApiProperty({ description: 'Título do curso', example: 'Paleontologia' })
    nome: string;

    @ApiProperty({ description: 'Tipo da pos graduação do curso', example: "Doutorado" })
    tipo_pos: string;

    @ApiProperty({ description: 'Link do documento CAPES do curso', example: "https://example.com" })
    link_documento_capes: string;

    @ApiProperty({ description: 'Link de detalhes do curso', example: "https://example.com" })
    link_detalhes_curso: string;

    @ApiProperty({ description: 'Data de criação', example: '2025-01-30T00:00:00' })
    data_criacao: Date;
  }  