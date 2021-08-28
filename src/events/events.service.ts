import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEventInterface } from 'src/interfaces/events.interface';
import { Repository } from 'typeorm';
import { EventEntity } from '../entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventEntity) private repo: Repository<EventEntity>,
  ) { }

  async create(data: CreateEventInterface): Promise<EventEntity> {
    const newItem = new EventEntity(data);

    return await this.repo.save(newItem);
  }

  async find(): Promise<EventEntity[]> {
    return await this.repo.find();
  }
}
