# Freight Simulator

The goal of this project is to create an environment where you can calculate the value and shipping time of objects based on the distance they will be sent, their dimensions and their weight.

## ▶️ Run (using Docker)

With Docker installed you can just build using docker-compose:

```bash
docker-compose build
```

And then up the containers:

```bash
docker-compose up
```

## 🧾 Documentation

The documentation was written with Swagger and can be viwed when the app is runing in [{API_URL}/api#/](http://localhost:3000/api#/)

## ⚙️ Configuration



## ▶️ Run (without Docker)

The backend has the database's structure and a API Rest hat communicates with the database and provides routes.
To the database was used a SQL structure with PostgreSQL. For the rest api of the backend, the TypeScript language was used with the Node framework and the Prisma tool.

To start de backend in development environment you need install Node and run:

```bash
npm install
```

Then you must to run the Prisma migrations. Prisma is a ORM and help to make queries in DB. You can run the migrations in your terminal with that line:

```bash
npx prisma migrate dev
```

Finally, just run the app:

```bash
npm run dev
```

## 🧪 Testing

In this API was used Jest to unit tests, these tests aim to test the main functionalities.

To start the automate tests just run:

```bash
npm test
```

## 📖 Bibliography

- [TypeScript](https://www.typescriptlang.org/)
- [Node](https://nodejs.org/en)
- [Nest](https://nestjs.com/)
- [Jest](https://jestjs.io/pt-BR/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
