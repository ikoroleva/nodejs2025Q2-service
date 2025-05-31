import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto, UserResponse } from './user.types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): UserResponse[] {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): UserResponse {
    if (!uuidValidate(id)) {
      throw new HttpException('Bad request. userId is invalid (not uuid)', HttpStatus.BAD_REQUEST);
    }

    const user = this.userService.findOne(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): UserResponse {
    if (!createUserDto.login || !createUserDto.password) {
      throw new HttpException(
        'Login and password are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.userService.create(createUserDto);
  }

  @Put(':id')
  updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): UserResponse {
    if (!uuidValidate(id)) {
      throw new HttpException('Bad request. userId is invalid (not uuid)', HttpStatus.BAD_REQUEST);
    }

    if (!updatePasswordDto.oldPassword || !updatePasswordDto.newPassword) {
      throw new HttpException(
        'Old password and new password are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const user = this.userService.updatePassword(id, updatePasswordDto);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === 'Old password is incorrect'
      ) {
        throw new HttpException(error.message, HttpStatus.FORBIDDEN);
      }
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): void {
    if (!uuidValidate(id)) {
      throw new HttpException('Bad request. userId is invalid (not uuid)', HttpStatus.BAD_REQUEST);
    }

    const isDeleted = this.userService.remove(id);
    if (!isDeleted) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
