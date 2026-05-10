import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { Appropriate_age } from '../../../generated/prisma/enums';

export class CreateEventDto {
  @IsString()
  @Length(3, 50)
  @IsNotEmpty()
  title: string;

  @IsString()
  @Length(3, 255)
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  @Length(3, 255)
  banner?: string;

  @Transform(({ value }) => new Date(value as string))
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsEnum(Appropriate_age)
  @IsNotEmpty()
  appropriate_age: Appropriate_age;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  max_person_quantity: number;

  @IsString()
  @IsNotEmpty()
  @Length(8, 8)
  cep: string;

  @IsString()
  number: string;

  @Transform(({ value }) => new Date(value as string))
  @IsNotEmpty()
  endAt: Date;
}

export class Event_localizationDto {
  estado: string;
  localidade: string;
  logradouro: string;
  bairro: string;
  erro?: boolean;
}
