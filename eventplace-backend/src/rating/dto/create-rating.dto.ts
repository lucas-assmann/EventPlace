import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateRatingDto {
  @IsString()
  eventId: string;

  @IsInt()
  @Min(0)
  @Max(5)
  stars: number;

  @IsOptional()
  @IsString()
  comment?: string;
}
