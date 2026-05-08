import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(25)
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  username: string;

  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 50)
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

  @IsString()
  @Length(8, 8)
  cep: string;
}

export class AddressResponse {
  estado: string;
  localidade: string;
  logradouro: string;
  erro?: boolean;
}
