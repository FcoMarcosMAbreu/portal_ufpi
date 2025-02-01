import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('processos_seletivos')
export class ProcessoSeletivo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  titulo: string;

  @Column({ type: 'text' })
  descricao: string;

  @Column({ type: 'varchar', length: 500 })
  link_inscricao: string;

  @CreateDateColumn({ type: 'timestamp' })
  data_criacao: Date;
}
