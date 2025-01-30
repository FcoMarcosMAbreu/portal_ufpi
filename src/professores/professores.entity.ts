// src/professores/professor.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Nivel, Vinculo } from './professores.enum';

@Entity()
export class Professor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  matricula: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: Nivel,
  })
  nivel: Nivel;

  @Column()
  telefone: string;

  @Column()
  curriculo_lattes: string;

  @Column({
    type: 'enum',
    enum: Vinculo,
  })
  vinculo: Vinculo;

  @Column()
  data_criacao: Date;
}