import { Module } from '@nestjs/common';
import { GetCep } from 'src/utils/get.cep.utils';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [EventController],
  providers: [EventService, GetCep],
})
export class EventModule {}
