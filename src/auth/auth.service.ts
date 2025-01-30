import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../admins/admin.entity';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { AdminsService } from 'src/admins/admins.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Admin)
        private adminRepository: Repository<Admin>,
        private configService: ConfigService,
      ) {}
    
    async register(createAdminDto: CreateAdminDto): Promise<Admin> {
        const { senha, ...adminData } = createAdminDto;
        const hashedPassword = await bcrypt.hash(senha, 10);
        const admin = this.adminRepository.create({ ...adminData, senha: hashedPassword });
        return this.adminRepository.save(admin);
    }

    async login(loginAdminDto: LoginAdminDto): Promise<{ access_token: string }> {
        const { email, senha } = loginAdminDto;
        const admin = await this.adminRepository.findOne({ where: { email } });
        if (!admin) {
          throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);
        }
    
        const isPasswordValid = await bcrypt.compare(senha, admin.senha);
        if (!isPasswordValid) {
          throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
    
        const payload = { id: admin.id, email: admin.email, cargo: admin.cargo };

        const secret = this.configService.get<string>('JWT_SECRET');
        const expiresIn = this.configService.get<String>('JWT_EXPIRES_IN');

        if (!secret) {
          throw new HttpException('JWT_SECRET is not defined in environment variables', HttpStatus.NOT_FOUND);
        }
        const access_token = jwt.sign(payload, secret, {
          expiresIn: '0.5h',
        });
    
        return { access_token };
    }
}
