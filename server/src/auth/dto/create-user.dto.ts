import {IsNotEmpty, IsOptional, IsString, Length, MaxLength} from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @Length(4, 16)
    readonly username: string;

    @IsNotEmpty()
    @Length(6, 16)
    readonly password: string;

    @MaxLength(32)
    @IsOptional()
    readonly name?: string;

    @MaxLength(128)
    @IsOptional()
    readonly description?: string;

    @MaxLength(256)
    @IsOptional()
    readonly avatarSrc?: string;
}