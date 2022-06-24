import {IsOptional, MaxLength} from 'class-validator';

export class CreateReactionDto {
    readonly rType: string;

    @MaxLength(128)
    @IsOptional()
    readonly text?: string;
}