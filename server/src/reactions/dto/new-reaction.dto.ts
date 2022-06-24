import {IsOptional, MaxLength} from 'class-validator';

export class NewReactionDto {
    readonly rType: string;

    @MaxLength(128)
    @IsOptional()
    readonly text?: string = '';

    readonly postId: number;
}