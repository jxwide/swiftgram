import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { PhotosService } from '../services/photos.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreatePhotoDto } from '../dto/create-photo.dto';
import { NewPhotoDto } from '../dto/new-photo.dto';

@Controller('photos')
export class PhotosController {
    constructor(private photosService: PhotosService) {}

    @UseGuards(JwtAuthGuard)
    @Post('add')
    addNewPhoto(@Body() newPhotoDto: NewPhotoDto, @Request() req) {
        return this.photosService.addPhoto({
            source: newPhotoDto.source,
            userId: req.user.id,
            postId: newPhotoDto.postId
        })
    }
}
