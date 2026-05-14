import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketService } from './ticket.service';
interface AuthRequest extends Request {
  user: JwtPayload;
}

interface JwtPayload {
  id: string;
}

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  create(
    @Body() createTicketDto: CreateTicketDto,
    @Req() request: AuthRequest,
  ) {
    const user = request.user;
    return this.ticketService.create(createTicketDto, user.id);
  }

  @Get('/my')
  findAll(@Req() request: AuthRequest) {
    const user = request.user;

    return this.ticketService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: AuthRequest) {
    const user = request.user;

    return this.ticketService.findOne(id, user.id);
  }

  @Get()
  findByName(@Req() request: AuthRequest, @Query('name') name: string) {
    const user = request.user;

    return this.ticketService.findByName(name, user.id);
  }
}
