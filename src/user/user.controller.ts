import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto, "CreateUserDta");
    
    return this.userService.create(createUserDto);
  }

  @Get()
  @HttpCode(200)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(201)
  update(@Param('id', ParseIntPipe)  id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(200)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(+id);
  }
}
