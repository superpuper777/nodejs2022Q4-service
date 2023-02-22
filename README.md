# Home Library Service 2

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

## Docker

Create image from Dockerfile for DB:
you can move to postgres folder

```
cd postgres
```

or change path: ./postgres

```
docker build -t my-postgres-db .
```

name of image - «my-postgres-db»

View all images:

```
docker images -a
```

You can run a container by doing:

```
docker run -d --name my-postgresdb-container -p 5432:5432 my-postgres-db
```

or

```
docker run --name postgres-container -p 5432:5432 -e POSTGRES_USER=your_name -e POSTGRES_PASSWORD={your_password} -e POSTGRES_DB=postgres -d my-postgres-db
```

Create container for app:

Create image from Dockerfile for app:

```
docker build -t my-postgres-db .
```

Create container for app:

```
docker run  --name app-container -dp 4000:4000 my-app
```

Run/stop compose file:

```
docker compose up
```

Run/stop compose file:

```
docker compose start
```

```
docker compose stop
```

## Database

Generate migration:

```
npm run migration:generate -- db/migrations/UserMigration
```

Create tables:

```
npm run migration:run
```

## ESLint

```
npm run lint
```
