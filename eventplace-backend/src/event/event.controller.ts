import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventService } from './event.service';

interface AuthRequest extends Request {
  user: JwtPayload;
}

interface JwtPayload {
  id: string;
}

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Req() request: AuthRequest, @Body() createEventDto: CreateEventDto) {
    const user = request.user;

    return this.eventService.create(createEventDto, user.id);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @Patch(':id')
  update(
    @Req() request: AuthRequest,
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    const user = request.user;
    return this.eventService.update(id, updateEventDto, user.id);
  }

  @Delete(':id')
  remove(@Req() request: AuthRequest, @Param('id') id: string) {
    const user = request.user;

    return this.eventService.remove(id, user.id);
  }
}
