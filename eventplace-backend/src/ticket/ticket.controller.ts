import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketService } from './ticket.service';
import { CheckinTicketDto } from './dto/checkin-ticket.dto';
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

  @Get('qrcode/generate/:ticketId')
  generateQRCode(@Param('ticketId') ticketId: string) {
    return this.ticketService.generateQRCode(ticketId);
  }

  @Get('payment/confirm')
  ConfirmPayment(@Query('code') code: string, @Req() request: AuthRequest) {
    const user = request.user;
    return this.ticketService.ConfirmPayment(code, user.id);
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

  @Post('checkin')
  checkin(@Body() dto: CheckinTicketDto, @Req() request: AuthRequest) {
    return this.ticketService.checkin(dto.entryCode, request.user.id);
  }
}
