import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(email): Promise<any> {
    return this.userRepository.findOne({
      where: { email: email },
    });
  }

  async findOneById(id): Promise<any> {
    const findOneById = await this.userRepository.findOne({
      where: { id: id },
    });
    return { user: findOneById };
  }

  async createOne(user): Promise<any> {
    const createOne = await this.userRepository.create({
      email: user.email,
      password: user.password,
    });
    await this.userRepository.save(createOne);
    return createOne;
  }
}
