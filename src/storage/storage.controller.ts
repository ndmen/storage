import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { StorageService } from './storage.service';
import { UploadFileDto } from './dto/upload-file.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('storage')
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './storage',
      }),
    }),
  )
  @Post()
  async create(@UploadedFile() file: Express.Multer.File) {
    console.log('file', file);
    return this.storageService.create({
      originalname: file.originalname,
      mimetype: file.mimetype,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.storageService.findOne(id);
  }
}
