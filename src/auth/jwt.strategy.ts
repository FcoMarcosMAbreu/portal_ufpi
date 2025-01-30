import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
//import { Admin } from 'src/admins/admin.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { AdminsService } from 'src/admins/admins.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private readonly adminsService: AdminsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    const { id } = payload;
    const admin = await this.adminsService.findOne(id);
    if (!admin){
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return { id: payload.id, email: payload.email, cargo: payload.cargo };
  }
}