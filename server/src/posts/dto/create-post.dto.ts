import { MaxLength } from 'class-validator';

export class CreatePostDto {
    @MaxLength(128)
    readonly description?: string;
}