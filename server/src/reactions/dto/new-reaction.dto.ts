import { MaxLength } from 'class-validator';

export class NewReactionDto {
    readonly rType: string;

    @MaxLength(128)
    readonly text?: string = '';

    readonly postId: number;
}