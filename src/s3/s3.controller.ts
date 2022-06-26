import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { S3Service } from './s3.service';
import { UploadFileDto } from './dto/upload-file.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('s3')
@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Post()
  async create(@Body() uploadFileDto: UploadFileDto) {
    return this.s3Service.create(uploadFileDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.s3Service.findOne(id);
  }
}
