import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Module } from './s3/s3.module';
import { StorageModule } from './storage/storage.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { S3 } from './s3/entities/s3.entity';
import { Storage } from './storage/entities/storage.entity';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    S3Module,
    StorageModule,
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.STORAGE_DB_HOST,
      username: process.env.STORAGE_DB_USERNAME,
      password: process.env.STORAGE_DB_PASSWORD,
      database: process.env.STORAGE_DB_DATABASE,
      entities: [S3, Storage, User],
      synchronize: true,
    }),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './storage',
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
