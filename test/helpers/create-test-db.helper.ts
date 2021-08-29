import { EntitySchema, createConnection } from 'typeorm';
import { TEST_CONFIG } from './config';

type Entity = Function | string | EntitySchema<any>;

export async function createTestDB(entities: Entity[], prefix: string) {
  return createConnection({
    type: 'mysql',
    host: TEST_CONFIG.host,
    port: TEST_CONFIG.port,
    username: TEST_CONFIG.username,
    password: TEST_CONFIG.password,
    database: TEST_CONFIG.database,
    entities: entities,
    synchronize: true,
    entityPrefix: `${prefix}__`,
  });
}
