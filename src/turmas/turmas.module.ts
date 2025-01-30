import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TurmasController } from './turmas.controller';
import { Turma } from './turma.entity';
import { TurmasService } from './turmas.service';

@Module({
  imports: [TypeOrmModule.forFeature([Turma])],
  controllers: [TurmasController],
  providers: [TurmasService],
})
export class TurmasModule {}
