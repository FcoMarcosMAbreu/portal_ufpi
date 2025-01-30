import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { CreateAdminDto } from '../auth/dto/create-admin.dto';
import { AdminResponseDto } from './dto/admin-response.dto';
import * as bcrypt from 'bcryptjs';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminsRepository: Repository<Admin>,
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<AdminResponseDto> {
    const { senha } = createAdminDto;
    const hashedPassword = await bcrypt.hash(senha, 10);

    const admin = this.adminsRepository.create({
      ...createAdminDto,
      senha: hashedPassword,
    });

    await this.adminsRepository.save(admin);
    return this.toAdminResponseDto(admin);
  }

  async findAll(): Promise<AdminResponseDto[]> {
    const admins = await this.adminsRepository.find();
    return admins.map(admin => this.toAdminResponseDto(admin));
  }

  async findOne(id: number): Promise<AdminResponseDto> {
    const admin = await this.adminsRepository.findOne({where: {id},});
    if (!admin) {
      throw new NotFoundException(`Admin with id ${id} not found`);
    }
    return this.toAdminResponseDto(admin);
  }

  async findOneByEmail(email: string): Promise<AdminResponseDto> {
    const admin = await this.adminsRepository.findOne({where: {email}, });
    if (!admin) {
      throw new NotFoundException(`Admin with email ${email} not found`);
    }
    return this.toAdminResponseDto(admin);
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<AdminResponseDto> {
    const admin = await this.adminsRepository.findOne({
      where: { id },
    });
  
    if (!admin) {
      throw new NotFoundException(`Admin with id ${id} not found`);
    }
  
    if (updateAdminDto.senha) {
      updateAdminDto.senha = await bcrypt.hash(updateAdminDto.senha, 10);
    }
  
    await this.adminsRepository.update(id, updateAdminDto);
    const updatedAdmin = await this.adminsRepository.findOne({
      where: { id },
    });

    if (!updatedAdmin) {
      throw new NotFoundException(`Updated admin with id ${id} not found`);
    }
  
    return this.toAdminResponseDto(updatedAdmin);
  }

  async remove(id: number): Promise<void> {
    const admin = await this.adminsRepository.findOne({where: {id},});
    if (!admin) {
      throw new NotFoundException(`Admin with id ${id} not found`);
    }

    await this.adminsRepository.delete(id);
  }

  private toAdminResponseDto(admin: Admin): AdminResponseDto {
    const { id, nome, email, cargo, departamento, data_criacao } = admin;
    return { id, nome, email, cargo, departamento, data_criacao };
  }
}