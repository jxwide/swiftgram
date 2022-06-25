import {BadRequestException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhotoEntity } from '../entities/photo.entity';
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

    async deletePhoto(photoId: number, userId?: number, postId?: number) {
        const photo = await this.photoRepository.findOne({
            where: {id: photoId},
            relations: ["post.creator"]
        })
        if (!photo) throw new BadRequestException('photo not found')
        if (userId && photo.post.creator.id != userId) throw new BadRequestException('unauthorized')
        if (postId && photo.post.id != postId) throw new BadRequestException('unauthorized')
        return this.photoRepository.delete({id: photoId})
    }

    async findAll() {
        return this.photoRepository.find()
    }
}
