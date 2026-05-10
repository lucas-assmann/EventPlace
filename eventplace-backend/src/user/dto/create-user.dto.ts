import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  MaxLength,
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

  @IsString()
  @Length(8, 8)
  cep: string;

  @IsString()
  @Length(1, 5)
  number: string;
}

export class AddressResponse {
  estado: string;
  localidade: string;
  logradouro: string;
  bairro: string;
  erro?: boolean;
}
