import { CreateEventInterface } from 'src/interfaces/events.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  event: Date;

  static capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  constructor(data?: CreateEventInterface) {
    if (!data) return;
    this.firstName = EventEntity.capitalize(data.firstName);
    this.lastName = EventEntity.capitalize(data.lastName);
    this.email = data.email;
    this.event = data.event;
  }
}
