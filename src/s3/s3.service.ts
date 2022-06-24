import { Injectable } from '@nestjs/common';
import { S3Repository } from './s3.repository';

@Injectable()
export class S3Service {
  constructor(private readonly s3Repository: S3Repository) {}
  async create(uploadFileDto: UploadFileDto) {
    const createOne = await this.s3Repository.createOne(uploadFileDto);
    return createOne;
  }

  async findOne(id: string) {
    const findOne = await this.s3Repository.findOne(id);
    return findOne;
  }
}
