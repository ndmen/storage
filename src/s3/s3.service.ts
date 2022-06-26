import { Injectable } from '@nestjs/common';
import { UploadFileDto } from './dto/upload-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { S3 } from './entities/s3.entity';

@Injectable()
export class S3Service {
  constructor(
    @InjectRepository(S3)
    private s3Repository: Repository<S3>,
  ) {}
  async create(uploadFileDto: UploadFileDto) {
    const createOne = await this.s3Repository.create(uploadFileDto);
    return createOne;
  }

  async findOne(id: number) {
    const findOne = await this.s3Repository.findOne(id);
    return findOne;
  }
}
