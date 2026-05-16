import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  ticketTypeId: string;

  @IsEnum([])
  @IsNotEmpty()
  Status: string;
}
