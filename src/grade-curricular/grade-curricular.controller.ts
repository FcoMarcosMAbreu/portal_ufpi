import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, UploadedFile, UseInterceptors, HttpException, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { GradeCurricularService } from './grade-curricular.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateGradeCurricularDto } from './dto/create-grade-curricular.dto';
import { UpdateGradeCurricularDto } from './dto/update-grade-curricular.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { GradeCurricularDto } from './dto/grade-curricular.dto';
import { GradeCurricularQueue } from './grade-curricular.queue';

@ApiTags('Grade Curricular')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('grade-curricular')
export class GradeCurricularController {
  constructor(private readonly gradeCurricularService: GradeCurricularService,
    private readonly gradeCurricularQueue: GradeCurricularQueue,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('ementa', {
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Envie os dados para criar uma nova grade curricular',
    type: CreateGradeCurricularDto,
  })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createGradeCurricularDto: CreateGradeCurricularDto,
  ): Promise<GradeCurricularDto> {
    const gradeCurricular = await this.gradeCurricularService.create(createGradeCurricularDto);
    if (file) {
      await this.gradeCurricularQueue.addToQueue(file.buffer, gradeCurricular.id);
    }
    return gradeCurricular;
  }

  @Get()
  findAll() {
    return this.gradeCurricularService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gradeCurricularService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGradeCurricularDto: UpdateGradeCurricularDto) {
    return this.gradeCurricularService.update(+id, updateGradeCurricularDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gradeCurricularService.remove(+id);
  }
}