import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DissertacoesTesesService } from './dissertacoes-teses.service';
import { DissertacoesTesesController } from './dissertacoes-teses.controller';
import { DissertacaoTese } from './dissertacao-tese.entity';
DissertacaoTese

@Module({
  imports: [TypeOrmModule.forFeature([DissertacaoTese])],
  controllers: [DissertacoesTesesController],
  providers: [DissertacoesTesesService],
})
export class DissertacoesTesesModule {}
