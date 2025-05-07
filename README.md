# Bookstore Microservices Project

This is a **monorepo** setup for a **Bookstore** application built with **NestJS**, leveraging **microservices architecture**. The project consists of three primary services:

1. **User Service**: Manages user data and authentication.
2. **Book Service**: Handles book data and operations related to books.
3. **Order Service**: Handles customer orders, including creating and fetching orders.

Additionally, the project includes an **API Gateway** that interacts with these services via TCP communication.

## Project Structure

The project is structured as follows:

````
bookstore/
├── apps/
│   ├── user-service/       # User service
│   ├── book-service/       # Book service
│   ├── order-service/      # Order service
│   └── bookstore/          # API Gateway (entry point)
└── package.json            # Main project package configuration

````
### Install Dependencies

To install the dependencies for all services, run the following command:
````
npm install
````

This will install dependencies for all the services defined in the monorepo.

### Setup Environment Variables

You need to set up the **MongoDB connection**. In the root of the project, create a `.env` file and include the following:

### Run All Services

To run all the services (User, Book, Order) in parallel, use the following command:

```bash
npm run start:services
```

This command uses **concurrently** to run the following services at the same time:

* `user-service` on port `3001`
* `book-service` on port `3002`
* `order-service` on port `3003`

### Run a Single Service

If you want to run a specific service, you can use one of the following commands:

```bash
# Run user-service
npm run start:user-service

# Run book-service
npm run start:book-service

# Run order-service
npm run start:order-service
```

### Swagger Documentation

Once the services are running, you can access the **Swagger API documentation** for the **API Gateway** by navigating to the following URL:

```
http://localhost:3000/api
```

## API Endpoints

### User Service API

* `POST /users`: Create a new user.
* `GET /users`: Get all users.
* `GET /users/:id`: Get a user by id.

### Book Service API

* `POST /books`: Create a new book.
* `GET /books`: Get all books.

### Order Service API

* `POST /orderr`: Create a new order.
* `GET /orders`: Get all orders.

## Folder Structure
The main components of the project are located in the following directories:

* **apps/**: Contains the services and the API gateway.
  * **user-service/**: Service handling user management.
  * **book-service/**: Service managing books.
  * **order-service/**: Service handling orders.
  * **bookstore/**: API Gateway.
* **package.json**: Main configuration for all dependencies and scripts.
* **.env**: Environment variables for MongoDB connection string.
