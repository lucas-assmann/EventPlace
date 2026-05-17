import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, Length } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdatePasswordDto {
  @IsString()
  @Length(5, 50)
  password: string;
  @IsString()
  @Length(5, 50)
  oldPassword: string;
}
