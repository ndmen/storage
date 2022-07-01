import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email, password): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return user;
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );

    if (user) {
      const payload = {
        email: user.email,
        sub: user.id,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }

  async register(registerUserDto: RegisterUserDto) {
    const user = await this.usersService.findOne(registerUserDto.email);
    if (user) {
      throw new HttpException(
        'User with this email exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(registerUserDto.password, saltOrRounds);
    const createOne = await this.usersService.createOne({
      ...registerUserDto,
      password: hash,
    });
    if (createOne) {
      const payload = {
        email: createOne.email,
        sub: createOne.id,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }
}
