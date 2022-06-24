import {IsOptional, MaxLength} from "class-validator";

export class UpdateSecInfoDto {
    @MaxLength(32)
    @IsOptional()
    name?: string;

    @MaxLength(128)
    @IsOptional()
    description?: string;

    @MaxLength(256)
    @IsOptional()
    avatarSrc?: string;
}