import { MaxLength } from 'class-validator';

export class CreateReactionDto {
    readonly rType: string;
    
    readonly text?: string;
}