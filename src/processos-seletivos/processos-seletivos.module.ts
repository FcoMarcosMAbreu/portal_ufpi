import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProcessoSeletivo } from './processos-seletivos.entity';
import { ProcessoSeletivoController } from './processos-seletivos.controller';
import { ProcessoSeletivoService } from './processos-seletivos.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProcessoSeletivo])],
  controllers: [ProcessoSeletivoController],
  providers: [ProcessoSeletivoService],
})
export class ProcessoSeletivoModule {}
