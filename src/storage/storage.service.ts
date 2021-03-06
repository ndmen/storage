import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Storage } from './entities/storage.entity';

@Injectable()
export class StorageService {
  constructor(
    @InjectRepository(Storage)
    private storageRepository: Repository<Storage>,
  ) {}
  async create(file: any) {
    const createOne = await this.storageRepository.create({
      user_id: file.user_id,
      path: file.path,
      originalname: file.originalname,
      mimetype: file.mimetype,
    });
    await this.storageRepository.save(createOne);
    return createOne;
  }

  async findOne(id: number) {
    const findOne = await this.storageRepository.findOne({
      where: { id: id },
    });
    if (!findOne) {
      throw new NotFoundException();
    }
    return findOne;
  }
}
