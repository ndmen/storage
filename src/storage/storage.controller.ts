import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Res,
  UploadedFile,
  UseInterceptors,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { StorageService } from './storage.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UploadFileDto } from './dto/upload-file.dto';

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
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() uploadFileDto: UploadFileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('file', file);
    return this.storageService.create({
      user_id: uploadFileDto.user_id,
      path: file.path,
      originalname: file.originalname,
      mimetype: file.mimetype,
    });
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number,
    @Res({ passthrough: true }) response: Response,
  ) {
    const file = await this.storageService.findOne(id);
    const stream = createReadStream(join(process.cwd(), file.path));
    response.set({
      'Content-Disposition': `inline; filename="${file.originalname}"`,
      'Content-Type': file.mimetype,
    });
    return new StreamableFile(stream);
    // return this.storageService.findOne(id);
  }
}
