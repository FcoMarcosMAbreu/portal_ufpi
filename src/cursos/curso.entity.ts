import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('curso')
export class Curso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nome: string;

  @Column({ type: 'varchar', length: 500 })
  link_documento_capes: string;

  @Column({ type: 'varchar', length: 500 })
  link_detalhes_curso: string;

  @CreateDateColumn({ type: 'timestamp' })
  data_criacao: Date;
}