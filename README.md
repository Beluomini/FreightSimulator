# Shipping Simulator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Current Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/Beluomini/ShippingSimulator) ![npm version](https://img.shields.io/badge/npm-10.7.0-green) 


The goal of this project is to create an environment where you can calculate the value and shipping time of objects based on the distance they will be sent, their dimensions and their weight.

## ⚙️ Configuration

To run using Docker, you only need the environment variables in the root folder where the docker-compose.yml file will be.

If you want to run without Docker in a development environment, you need the environment variables in both the frontend and backend scopes.

### Root

In the project root folder, create a file called .env that will store the environment variables for docker-compose, the file must contain this format:

```dotenv
PORT=FRONTED_PORT
API_PORT=BACKEND_PORT
GEOCODING_API_KEY=GEOCODING_API_KEY
GEOCODING_API_ROUTE=GEOCODING_API_ROUTE
NEXT_PUBLIC_API_URL=FRONTED_API_URL
DATABASE_USER=USER
DATABASE_PASSWORD=PASS
DATABASE_PORT=DATABASE_PORT
DATABASE_URL=DATABASE_URL
```

### Backend

Inside the backend folder you need to create a file named .env

    .
    └── backend
       └── .env

It is necessary to insert the following environment variables:

```dotenv
API_PORT=BACKEND_PORT
GEOCODING_API_KEY=GEOCODING_API_KEY
GEOCODING_API_ROUTE=GEOCODING_API_ROUTE
DATABASE_URL=DATABASE_URL
```

### Frontend

Inside the frontend folder you need to create a file named .env

    .
    └── frontend
       └── .env

It is necessary to insert the following environment variables:

```dotenv
NEXT_PUBLIC_API_URL=FRONTED_API_URL
```

## ▶️ Run 

### Using Docker

With Docker installed you can just build and up using docker-compose:

```bash
docker-compose up --build
```

### Using Terminal

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

## 🧾 Documentation

The documentation was written with Swagger and can be viwed when the app is runing in [{API_URL}/docs](http://localhost:5000/docs)

## 🧪 Testing

In this API was used Jest to unit tests, these tests aim to test the main functionalities.

To start the automate tests just run:

```bash
npm test
```

## 📂 Project Struture

    .
    ├── backend
    │   ├── Dockerfile
    │   ├── prisma
    │   │   └── *shema.prisma*
    │   ├── src
    │   │   ├── *main.ts*
    │   │   ├── database
    │   │   ├── integrations
    │   │   ├── utils
    │   │   ├── logistic-operator
    │   └── └── simulations
    ├── frontend
    │   ├── Dockerfile
    │   ├── src
    │   │   ├── pages
    │   │   │   └── *index.tsx*
    │   │   ├── components
    │   └── └── styles
    └── docker-compose.yml

## 🔃 Versioning

This project uses [Git](https://git-scm.com/) for version control, [GitHub](https://github.com/Beluomini/ShippingSimulator) as a repository following the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/ ) pattern.

## 📃 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📖 Bibliography

- [TypeScript](https://www.typescriptlang.org/)
- [Node](https://nodejs.org/en)
- [Nest](https://nestjs.com/)
- [Jest](https://jestjs.io/pt-BR/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
