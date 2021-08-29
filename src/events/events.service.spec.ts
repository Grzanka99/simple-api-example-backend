import { EventEntity } from 'src/entities/event.entity';
import { CreateEventInterface } from 'src/interfaces/events.interface';
import { createTestDB } from '../../test/helpers/create-test-db.helper';
import { Connection, Repository } from 'typeorm';
import { EventsService } from './events.service';

describe('EventsService', () => {
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
  });

  afterAll(async () => {
    await repo.delete({});
    await db.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should capitaliza string', () => {
    const str = 'test1';
    const str2 = 'teSt2';

    expect(EventEntity.capitalize(str)).toBe('Test1');
    expect(EventEntity.capitalize(str2)).toBe('Test2');
  });

  it('should create an event', async () => {
    const newEvent = await service.create([testData[0]]);

    const { firstName, lastName, email, event } = testData[0];

    expect(newEvent[0]).toBeDefined();
    expect(newEvent[0]).toMatchObject({
      firstName: EventEntity.capitalize(firstName),
      lastName: EventEntity.capitalize(lastName),
      email,
      event,
    });
  });

  it('should find event by id', async () => {
    const created = await service.create([testData[0]]);
    const found = await service.find(created[0].id);

    expect(found).toBeDefined();
    expect(found).toMatchObject(created[0]);
  });

  it('should find all events', async () => {
    await service.create(testData);

    const found = await service.find();

    expect(found).toBeDefined();
    expect(found.length).toBe(2);
  });

  it('should delete an event', async () => {
    const created = await service.create([testData[0]]);
    const deleted = await service.delete(created[0].id);

    expect(deleted.affected).toBe(1);
    expect(deleted.removed).toMatchObject(created[0]);
  });

  it('should throw type error', async () => {
    // @ts-expect-error it's for testing
    await expect(service.create([invalidData])).rejects.toThrowError(
      TypeError('Wrong email format'),
    );
  });
});
