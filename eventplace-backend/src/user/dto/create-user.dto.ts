import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(25)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MaxLength(20)
  @MinLength(3)
  username: string;

  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  password: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  @MaxLength(500)
  avatar?: string;

  @Type(() => Date)
  @IsDate()
  birthDate: Date;

  @IsNumber()
  @Min(0)
  @Max(10)
  rating: number;
}
