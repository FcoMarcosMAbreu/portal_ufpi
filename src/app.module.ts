import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AdminsModule } from './admins/admins.module';
import { AlunosModule } from './alunos/alunos.module';
import { ProfessoresModule } from './professores/professores.module';
import { CursosModule } from './cursos/cursos.module';
import { DocumentosModule } from './documentos/documentos.module';
import { NoticiasModule } from './noticias/noticias.module';
import { GradeCurricularModule } from './grade-curricular/grade-curricular.module';
import { TurmasModule } from './turmas/turmas.module';
import { DissertacoesTesesModule } from './dissertacoes-teses/dissertacoes-teses.module';
import { CalendarioModule } from './calendario/calendario.module';
import { ProcessoSeletivoModule } from './processos-seletivos/processos-seletivos.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: true, /*desativar em produção*/
      }),
    }),
    AuthModule,
    AdminsModule,
    AlunosModule,
    ProfessoresModule,
    CursosModule,
    DocumentosModule,
    NoticiasModule,
    GradeCurricularModule,
    TurmasModule,
    DissertacoesTesesModule,
    CalendarioModule,
    ProcessoSeletivoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}