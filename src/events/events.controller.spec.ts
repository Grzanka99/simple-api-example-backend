import { EventEntity } from 'src/entities/event.entity';
import { createTestDB } from '../../test/helpers/create-test-db.helper';
import { Connection, Repository } from 'typeorm';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { CreateEventInterface } from 'src/interfaces/events.interface';

describe('EventsController', () => {
  let controller: EventsController;
  let db: Connection;
  let service: EventsService;
  let repo: Repository<EventEntity>;

  const testData: CreateEventInterface[] = [
    {
      firstName: 'test1',
      lastName: 'test1',
      email: 'test@test.test',
      event: new Date('2021-01-01'),
    },
    {
      firstName: 'test2',
      lastName: 'test2',
      email: 'test2@user.test',
      event: new Date('2022-03-03'),
    },
  ];

  const invalidData = {
    firstName: 'foo',
    lastName: 'bar',
    email: 'foobar',
    event: 123,
  };

  beforeAll(async () => {
    db = await createTestDB([EventEntity], 'events');
    repo = db.getRepository(EventEntity);
    service = new EventsService(repo);
  });

  beforeEach(async () => {
    await repo.delete({});
    controller = new EventsController(service);
  });

  afterAll(async () => {
    await repo.delete({});
    await db.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return array of events', async () => {
    const res = await controller.createEvent(testData);

    expect(Array.isArray(res)).toBeTruthy();
    expect(res.length).toBe(testData.length);
  });

  it('should find all events', async () => {
    const res = await controller.createEvent(testData);
    const found = await controller.findEvents();

    expect(found).toMatchObject(res);
  });

  it('should find event by ID', async () => {
    const res = await controller.createEvent(testData);
    const found = await controller.findOne({ id: res[0].id });

    expect(found).toMatchObject(res[0]);
  });

  it('shoud delete event', async () => {
    const res = await controller.createEvent(testData);
    const deleted = await controller.deleteEvent({ id: res[0].id });

    expect(deleted.affected).toBe(1);
    expect(deleted.removed).toMatchObject(res[0]);
  });
});
