import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateEventDto } from 'src/dto/events.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private service: EventsService) { }

  @Get()
  async findEvents() {
    return this.service.find();
  }

  @Post('/')
  async createEvent(
    @Body(new ValidationPipe()) createEventDto: CreateEventDto,
  ) {
    return await this.service.create(createEventDto);
  }
}
