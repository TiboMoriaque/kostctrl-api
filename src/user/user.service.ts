import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.prisma.client.orm.public.User.create({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      location: createUserDto.location,
      email: createUserDto.email,
      password: hashedPassword,
      phone: createUserDto.phone,
    });

    return user;
  }

  findAll() {
    const users = this.prisma.client.orm.public.User.all()
    return users;
  }

  findOne(id: number) {
    const user = this.prisma.client.orm.public.User.where({id}).first()
    if(!user){
      throw new NotFoundException("Utilisateur inexistant")
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.prisma.client.orm.public.User.where({id}).first()
    if(!user){
      throw new NotFoundException("Utilisateur inexistant")
    }
    const userUpdated = this.prisma.client.orm.public.User.where({id}).update({
      firstName: updateUserDto.firstName,
      lastName: updateUserDto.lastName,
      phone: updateUserDto.phone,
      location: updateUserDto.location,
      email: updateUserDto.email
    })
    return userUpdated;
  }

async  remove(id: number) {
    const user = this.prisma.client.orm.public.User.where({id}).first()
    if(!user){
      throw new NotFoundException("Utilisateur inexistant")
    }
    const removedUser = await this.prisma.client.orm.public.User.where({id}).delete()
    return `L'utilisateur ${removedUser?.id} est supprimé`;
  }
}
