import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto, SignupDto, AuthResponse } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.userService.findByLogin(loginDto.login);

    if (!user || user.password !== loginDto.password) {
      throw new UnauthorizedException('Incorrect login or password');
    }

    const token = this.jwtService.sign({ userId: user.id, login: user.login });
    return { token };
  }

  async signup(signupDto: SignupDto): Promise<void> {
    const existingUser = await this.userService.findByLogin(signupDto.login);

    if (existingUser) {
      throw new ConflictException('Login already exists');
    }

    await this.userService.create(signupDto);
  }
}
