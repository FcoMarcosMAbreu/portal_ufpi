// src/professores/dto/professor-response.dto.ts
import { Nivel, Vinculo } from '../professores.enum';

export class ProfessorResponseDto {
  id: number;
  nome: string;
  matricula: string;
  email: string;
  nivel: Nivel;
  telefone: string;
  curriculo_lattes: string;
  vinculo: Vinculo;
  data_criacao: Date;
}