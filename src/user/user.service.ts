import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  User,
  CreateUserDto,
  UpdatePasswordDto,
  UserResponse,
} from './user.types';

@Injectable()
export class UserService {
  private users: User[] = [];

  create(createUserDto: CreateUserDto): UserResponse {
    const newUser: User = {
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users.push(newUser);
    const { password: _password, ...userResponse } = newUser;
    return userResponse;
  }

  findAll(): UserResponse[] {
    return this.users.map(({ password: _password, ...user }) => user);
  }

  findOne(id: string): UserResponse | null {
    const user = this.users.find((user) => user.id === id);
    if (!user) return null;

    const { password: _password, ...userResponse } = user;
    return userResponse;
  }

  findByLogin(login: string): User | null {
    return this.users.find((user) => user.login === login) || null;
  }

  updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): UserResponse | null {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) return null;

    if (this.users[userIndex].password !== updatePasswordDto.oldPassword) {
      throw new Error('Old password is incorrect');
    }

    this.users[userIndex] = {
      ...this.users[userIndex],
      password: updatePasswordDto.newPassword,
      version: this.users[userIndex].version + 1,
      updatedAt: Date.now(),
    };

    const { password: _password, ...userResponse } = this.users[userIndex];
    return userResponse;
  }

  remove(id: string): boolean {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) return false;

    this.users.splice(userIndex, 1);
    return true;
  }
}
