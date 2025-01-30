// src/professores/professores.module.ts
import { Module } from '@nestjs/common';
import { ProfessoresService } from './professores.service';
import { ProfessoresController } from './professores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nivel, Vinculo } from './professores.enum';
import { Professor } from './professores.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Professor])],
  controllers: [ProfessoresController],
  providers: [ProfessoresService],
})
export class ProfessoresModule {}