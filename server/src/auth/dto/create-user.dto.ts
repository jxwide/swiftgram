import { IsNotEmpty, IsString, Length, MaxLength } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @Length(4, 16)
    readonly username: string;

    @IsNotEmpty()
    @Length(6, 16)
    readonly password: string;

    //@MaxLength(32)
    readonly name?: string;

    //@MaxLength(128)
    readonly description?: string;

    //@MaxLength(256)
    readonly avatarSrc?: string;
}