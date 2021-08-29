import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEventInterface } from 'src/interfaces/events.interface';
import { Repository } from 'typeorm';
import { EventEntity } from '../entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventEntity) private repo: Repository<EventEntity>,
  ) { }

  async create(data: CreateEventInterface[]): Promise<EventEntity[]> {
    const newItems = data.map((item) => {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(item.email))
        throw new TypeError('Wrong email format');
      return new EventEntity(item);
    });
    return await this.repo.save(newItems);
  }

  async find(): Promise<EventEntity[]>;
  async find(id: number): Promise<EventEntity>;
  async find(id?: any): Promise<any> {
    let found: EventEntity | EventEntity[];

    if (id !== undefined) found = await this.repo.findOne(id);
    else found = await this.repo.find();

    if (!found) {
      throw new NotFoundException(`Event of id: ${id} not found`);
    }

    return found;
  }

  async delete(
    id: number,
  ): Promise<{ affected: number; removed: EventEntity }> {
    const removed = await this.find(id);

    const { affected } = await this.repo.delete(id);

    return {
      affected,
      removed,
    };
  }
}
