import { Injectable } from '@nestjs/common';
import { UploadFileDto } from './dto/upload-file.dto';
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
    return findOne;
  }
}
