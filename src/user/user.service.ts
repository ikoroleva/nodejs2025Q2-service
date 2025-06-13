import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto, UserResponse } from './user.types';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByLogin(
      createUserDto.login,
    );
    if (existingUser) {
      throw new Error('User already exists');
    }

    return this.userRepository.create({
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
    });
  }

  async findAll(): Promise<UserResponse[]> {
    const users = await this.userRepository.findAll();
    return users.map(({ password: _password, ...user }) => user);
  }

  async findOne(id: string): Promise<UserResponse | null> {
    const user = await this.userRepository.findById(id);
    if (!user) return null;

    const { password: _password, ...userResponse } = user;
    return userResponse;
  }

  async findByLogin(login: string): Promise<User | null> {
    return this.userRepository.findByLogin(login);
  }

  async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserResponse | null> {
    const user = await this.userRepository.findById(id);
    if (!user) return null;

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new Error('Old password is incorrect');
    }

    const updatedUser = await this.userRepository.update(id, {
      password: updatePasswordDto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    });

    if (!updatedUser) return null;

    const { password: _password, ...userResponse } = updatedUser;
    return userResponse;
  }

  async remove(id: string): Promise<boolean> {
    return this.userRepository.delete(id);
  }
}
