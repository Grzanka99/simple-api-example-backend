import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateEventDto } from 'src/dto/events.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private service: EventsService) { }

  @Get('/')
  async findEvents() {
    return this.service.find();
  }

  @Get('/:id')
  async findOne(@Param() { id }: { id: number }) {
    return this.service.find(id);
  }

  @Post('/')
  async createEvent(
    @Body(new ValidationPipe()) createEventDto: CreateEventDto[],
  ) {
    return await this.service.create(createEventDto);
  }

  @Delete('/:id')
  async deleteEvent(@Param() { id }: { id: number }) {
    return await this.service.delete(id);
  }
}
