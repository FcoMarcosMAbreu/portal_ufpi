import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum tipoEnum {
  Doutorado = 'Doutorado',
  Mestrado = 'Mestrado',
}  

@Entity('grade_curricular')
export class GradeCurricular {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  codigo: string;

  @Column({type: 'enum', enum: tipoEnum})
  tipo_pos: string;

  @Column()
  componente_curricular: string;

  @Column('varchar', { nullable: true })
  ementa: string;

  @Column()
  carga_horaria: string;

  @Column()
  data_criacao: Date;
}