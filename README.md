# HOW TO RUN

## Install dependencies

First, install all node modules

```bash
$ pnpm install
```

## Prepare ormconfig

```bash
$ cp ormconfig.example.json ormconfig.json
```

To run mariadb server, simply run docker image with following command:
```bash
$ docker run --name test-mariadb -p 3306:3306 \
              -e MYSQL_ROOT_PASSWORD=root \
              -e MYSQL_DATABASE=testdb \
              -d mariadb
```

And then configure ormconfig.json file

```json 
{
  "type": "mariadb",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "root",
  "database": "testdb",
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "synchronize": true,
  "entityPrefix": "example__"
}
```

## Run app

To run app in development mode

```bash
$ pnpm start:dev
```

To run app in production mode

```bash
$ pnpm build
$ pnpm start:prod
```

# TESTING

## Prepare config file for helper

```bash
$ cp test/helpers/config.example.ts test/helpers/config.ts
```

You can use same database, but you can run another one if you want.
When database is ready, `fill test/helpers/config.ts` file with proper data

```typescript
export const TEST_CONFIG = {
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'testdb',
};
```

## Run tests

To run tests:

```bash
$ pnpm test
```

To run tests with coverage test

```bash
$ pnpm test:cov
```

