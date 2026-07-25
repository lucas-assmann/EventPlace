import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
interface AuthRequest extends Request {
  user: JwtPayload;
}

interface JwtPayload {
  id: string;
}

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Get('can-rate/:eventId')
  canRate(@Param('eventId') eventId: string, @Req() request: AuthRequest) {
    return this.ratingService.canRate(eventId, request.user.id);
  }

  @Post()
  create(@Body() dto: CreateRatingDto, @Req() request: AuthRequest) {
    return this.ratingService.create(dto, request.user.id);
  }
}
