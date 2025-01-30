import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminResponseDto } from './dto/admin-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Certifique-se de ter o guard de autenticação
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@ApiTags('Admins')
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  @UseGuards(JwtAuthGuard) // Protege a rota para admins autenticados
  @ApiBearerAuth() // Requer autenticação via token JWT
  @ApiResponse({ status: 201, description: 'Admin created', type: AdminResponseDto })
  create(@Body() createAdminDto: CreateAdminDto): Promise<AdminResponseDto> {
    return this.adminsService.create(createAdminDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Get all admins', type: [AdminResponseDto] })
  findAll(): Promise<AdminResponseDto[]> {
    return this.adminsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Get admin by id', type: AdminResponseDto })
  findOne(@Param('id') id: number): Promise<AdminResponseDto> {
    return this.adminsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Admin updated', type: AdminResponseDto })
  update(@Param('id') id: number, @Body() updateAdminDto: UpdateAdminDto): Promise<AdminResponseDto> {
    return this.adminsService.update(id, updateAdminDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'Admin deleted' })
  remove(@Param('id') id: number): Promise<void> {
    return this.adminsService.remove(id);
  }
}