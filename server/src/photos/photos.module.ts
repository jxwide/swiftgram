import { Module } from '@nestjs/common';
import { PhotosService } from './services/photos.service';
import { PhotosController } from './controllers/photos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoEntity } from './entities/photo.entity';

@Module({
  providers: [PhotosService],
  controllers: [PhotosController],
  imports: [
      TypeOrmModule.forFeature([PhotoEntity])
  ]
})
export class PhotosModule {}
