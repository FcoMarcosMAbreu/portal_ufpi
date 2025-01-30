import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('calendarios')
export class Calendario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  titulo: string;

  @Column({ type: 'text' })
  descricao: string;

  @Column({ type: 'date' })
  data_inicio: string;

  @Column({ type: 'date' })
  data_termino: string;

  @CreateDateColumn({ type: 'timestamp' })
  data_criacao: Date;
}
