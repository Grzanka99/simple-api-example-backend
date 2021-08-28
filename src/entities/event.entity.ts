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

  constructor(data?: CreateEventInterface) {
    if (!data) return;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.event = data.event;
  }
}
