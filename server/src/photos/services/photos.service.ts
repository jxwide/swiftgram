import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhotoEntity } from '../entities/photo.entity';
import { CreatePhotoDto } from '../dto/create-photo.dto';
import { PostsService } from '../../posts/services/posts.service';

@Injectable()
export class PhotosService {
    constructor(
        @InjectRepository(PhotoEntity)
        private photoRepository: Repository<PhotoEntity>,
        private postsService: PostsService
    ) {}

    async addPhoto(options) {
        try {
            const post = await this.postsService.findById(options.postId)
            if (post && post?.creator.id == options.userId) {
                return this.photoRepository.save({source: options.source, post})
            } else return null
        } catch (e) {
            return e
        }
    }
}
