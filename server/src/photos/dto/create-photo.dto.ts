import { MaxLength } from 'class-validator';

export class CreatePhotoDto {
    @MaxLength(256)
    readonly source: string;
}