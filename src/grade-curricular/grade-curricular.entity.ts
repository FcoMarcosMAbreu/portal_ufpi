import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('grade_curricular')
export class GradeCurricular {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  codigo: string;

  @Column()
  componente_curricular: string;

  @Column('bytea', { nullable: true })
  ementa: Buffer;

  @Column()
  carga_horaria: string;

  @Column()
  data_criacao: Date;
}