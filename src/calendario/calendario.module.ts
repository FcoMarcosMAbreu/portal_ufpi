import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarioService } from './calendario.service';
import { CalendarioController } from './calendario.controller';
import { Calendario } from './calendario.entity';
Calendario
@Module({
  imports: [TypeOrmModule.forFeature([Calendario])],
  controllers: [CalendarioController],
  providers: [CalendarioService],
})
export class CalendarioModule {}
