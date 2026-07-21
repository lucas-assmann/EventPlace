import { IsNotEmpty, IsString } from 'class-validator';

export class CheckinTicketDto {
  @IsString()
  @IsNotEmpty()
  entryCode: string;
}
