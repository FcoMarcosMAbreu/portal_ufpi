import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { TipoDocumento } from './tipo-documento.enum';

@Entity()
export class Documento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ type: 'enum', enum: TipoDocumento })
  tipo: TipoDocumento;

  @Column({ type: 'bytea' })
  arquivo: Buffer;

  @CreateDateColumn()
  data_criacao: Date;
}