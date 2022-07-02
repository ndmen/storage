import { Injectable } from '@nestjs/common';
import { UploadFileDto } from './dto/upload-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as AWS from 'aws-sdk';
import { S3 } from './entities/s3.entity';

@Injectable()
export class S3Service {
  constructor(
    @InjectRepository(S3)
    private s3Repository: Repository<S3>,
  ) {}
  async create(uploadFileDto: UploadFileDto) {
    const createOne = await this.s3Repository.create(uploadFileDto);
    await this.s3Repository.save(createOne);
    return createOne;
  }

  async findOne(id: number) {
    const findOne = await this.s3Repository.findOne({
      where: { id: id },
    });
    return findOne;
  }

  AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
  s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_KEY_SECRET,
  });

  async uploadFile(file) {
    const { originalname } = file;

    await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      originalname,
      file.mimetype,
    );
  }

  async s3_upload(file, bucket, name, mimetype) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    };

    console.log(params);

    try {
      const s3Response = await this.s3.upload(params).promise();

      console.log(s3Response);
    } catch (e) {
      console.log(e);
    }
  }
}
