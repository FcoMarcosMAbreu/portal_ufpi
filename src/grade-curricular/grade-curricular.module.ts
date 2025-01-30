import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GradeCurricularService } from './grade-curricular.service';
import { GradeCurricularController } from './grade-curricular.controller';
import { GradeCurricular } from './grade-curricular.entity';
import { BullModule } from '@nestjs/bull';
import { GradeCurricularQueue } from './grade-curricular.queue';

@Module({
  imports: [TypeOrmModule.forFeature([GradeCurricular]),
  BullModule.registerQueue({
    name: 'grade-curricular-queue',
  }),
],
  controllers: [GradeCurricularController],
  providers: [GradeCurricularService, GradeCurricularQueue],
})
export class GradeCurricularModule {}