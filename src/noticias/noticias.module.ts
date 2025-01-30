// src/noticias/noticias.module.ts
import { Module } from '@nestjs/common';
import { NoticiasController } from './noticias.controller';
import { NoticiasService } from './noticias.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Noticia } from './noticia.entity';
import { BullModule } from '@nestjs/bull';
import { NoticiasProcessor } from './noticias.processor';

@Module({
  imports: [TypeOrmModule.forFeature([Noticia]),
  BullModule.registerQueue({
    name: 'noticias',
  })
],
  controllers: [NoticiasController],
  providers: [NoticiasService, NoticiasProcessor],
})
export class NoticiasModule {}
