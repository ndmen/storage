import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto {
  @ApiProperty()
  @IsString()
  user_id: number;
}
