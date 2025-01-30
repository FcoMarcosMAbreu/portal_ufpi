import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Turma {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  materia: string;

  @Column()
  nome_turma: string;

  @Column()
  horarios: string;

  @Column()
  periodo_ano: string;

  @Column()
  docentes: string;

  @CreateDateColumn()
  data_criacao: Date;
}
