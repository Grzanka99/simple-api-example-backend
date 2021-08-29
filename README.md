# HOW TO RUN

## Install dependencies

First, install all node modules

```bash
$ pnpm install
```

## Now prepare ormconfig

```bash
$ cp ormconfig.example.json ormconfig.json
```

You can easily run mysql server with docker

```bash
$ docker run --name test-mysql -p 3306:3306 \
              -e MYSQL_ROOT_PASSWORD=root \
              -e MYSQL_DATABASE=testdb \
              -d mysql:latest
```

And then configure ormconfig.json file

```json 
{
  "type": "mysql",
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
