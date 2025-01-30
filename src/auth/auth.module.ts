import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminsModule } from 'src/admins/admins.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { AdminsService } from 'src/admins/admins.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AdminsModule,
    ConfigModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,  // Garantindo que o segredo seja configurado
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },  // Opcional, define a expiração do JWT
    }),
  ],
  providers: [AuthService, AdminsService, JwtStrategy, ConfigService],
  controllers: [AuthController],
})
export class AuthModule {}
