# Zé Delivery Code Challenge - Back-end

This API is a attempt to solve the [back-end challenge of Ze Delivery](https://github.com/ZXVentures/ze-code-challenges/blob/master/backend.md). Its main purposes are to create, find a partner by its id and find nearest partner for the given latitude and longitude.

The project is written in TypeScript, and uses PostgreSQL as database, with the help of TypeORM library. It also uses Turf library functions to do the necessary manipulations of GeoJSON data.

## 📌 API

### Partner

The partners are represented in the following JSON format, in which the address is a GeoJSON Point, and the coverageArea is a GeoJSON Multipolygon.

```json
{
  "id": 1, 
  "tradingName": "Adega da Cerveja - Pinheiros",
  "ownerName": "Zé da Silva",
  "document": "1432132123891/0001",
  "coverageArea": { 
    "type": "MultiPolygon", 
    "coordinates": [
      [[[30, 20], [45, 40], [10, 40], [30, 20]]], 
      [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]
    ]
  },
  "address": { 
    "type": "Point",
    "coordinates": [-46.57421, -21.785741]
  }
}
```

### Routes

- `/partner POST`

Creates new partner in database.

- `/partner/nearest GET`

Finds nearest partner which the coverage area includes the location of the user, mesured by latitude and longitude

Query:

```json
{
  "userLat": 1,
  "userLon": 1
}
```

- `/partner/:id GET`

Finds a partner by its id.

## 🚀 Preparing to run application
Follow the instructions to get a copy of this project in your local environment to develop and test.

###  Pre-requisites
To run the project you will need:
- [Docker](https://docker.com) version 17 or higher
- [docker-compose](https://github.com/docker/compose) version 1.10 or higher
- [Node.js](https://nodejs.org) version 13.0 or higher

### Installing Dependencies
Clone this repo:
```sh
git clone https://github.com/me-marchi/ze-code-challenge-backend
```

Install npm
```sh
npm install -g 
```

Install projects dependencies:
```sh
npm i
```

### Environment
Create a .env file and set your local environment variables:
```sh
cp .env-example .env
```

Create docker container
```bash
docker-compose up -d
```

### Database
To seed database:
```sh
npm run database:seed
```

## 🔩 Test
Create the file .env.test using.
```sh
cp .env-example .env.test
```
It's important to set another database to make tests. If your database do not use auth, delete the  authentication variables as the .env file:

You can run tests using:
```sh
npm run test 
```
or with coverage
```sh
npm run test:coverage
```

## 🛠️ Running
After config, to run application:
```sh
npm run start:dev
```
