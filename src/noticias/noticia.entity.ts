// src/noticias/noticia.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TagNoticia } from './tag.enum';

@Entity('noticias')
export class Noticia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column({ type: 'enum', enum: TagNoticia })
  tag: TagNoticia;

  @Column('text')
  conteudo: string;

  @Column()
  links_referencia: string;

  @Column({ type: 'varchar', nullable: true })
  arquivo: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  data_criacao: Date;
}