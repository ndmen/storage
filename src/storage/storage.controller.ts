import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { StorageService } from './storage.service';
import { UploadFileDto } from './dto/upload-file.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('storage')
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post()
  async create(@Body() uploadFileDto: UploadFileDto) {
    return this.storageService.create(uploadFileDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.storageService.findOne(id);
  }
}
