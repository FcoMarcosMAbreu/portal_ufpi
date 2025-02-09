import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { TipoDocumento } from './tipo-documento.enum';
import { TagDocumento } from './tag-documento.enum';

@Entity()
export class Documento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  nome: string;

  @Column({ type: 'enum', enum: TipoDocumento })
  tipo: TipoDocumento;

  @Column({ type: 'enum', enum: TagDocumento })
  tag: TagDocumento;

  @Column()
  caminho_arquivo: string;

  @CreateDateColumn()
  data_criacao: Date;
}