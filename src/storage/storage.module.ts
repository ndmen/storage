import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Storage } from './entities/storage.entity';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([Storage])],
  controllers: [StorageController],
  providers: [StorageService],
})
export class StorageModule {}
