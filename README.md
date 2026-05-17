# project-ecom

A RESTful e-commerce backend API built with **Node.js**, **Express**, **TypeScript**, and **MongoDB (Mongoose)**. Currently handles user authentication and user management, with more features planned.

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express v5
- **Language:** TypeScript
- **Database:** MongoDB via Mongoose
- **Dev Tool:** ts-node-dev

---

## Project Structure

```
src/
├── app.ts               # Express app setup, middleware, routes
├── server.ts            # Server entry point, DB connection
├── config/
│   └── db.config.ts     # MongoDB connection logic
├── controllers/
│   ├── auth.controller.ts   # Register, Login
│   └── user.controller.ts   # Get all, Get by ID, Delete
├── middlewares/
│   └── errorHandler.middleware.ts  # Global error handler
├── models/
│   └── user.model.ts    # Mongoose User schema
└── routes/
    ├── auth.routes.ts   # /api/v1/auth
    └── user.routes.ts   # /api/v1/users
```

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB running locally

### Installation

```bash
git clone https://github.com/ayuushpokharel/project-ecom.git
cd project-ecom
npm install
```

### Running the Dev Server

```bash
npm run dev
```

Server starts at `http://localhost:8080`.

### Build for Production

```bash
npm run build   # compiles TypeScript to dist/
npm start       # runs the compiled output
```

---

## API Reference

Base URL: `http://localhost:8080/api/v1`

### Health Check

| Method | Endpoint | Description        |
|--------|----------|--------------------|
| GET    | `/`      | Server health check |

### Auth — `/api/v1/auth`

| Method | Endpoint    | Description       | Body                                      |
|--------|-------------|-------------------|-------------------------------------------|
| POST   | `/register` | Create an account | `full_name`, `email`, `password`, `phone` |
| POST   | `/login`    | Login             | `email`, `password`                       |

### Users — `/api/v1/users`

| Method | Endpoint  | Description       |
|--------|-----------|-------------------|
| GET    | `/`       | Get all users     |
| GET    | `/:id`    | Get user by ID    |
| DELETE | `/:id`    | Delete a user     |

---

## Environment

The DB URI and port are currently hardcoded in `server.ts`:

```ts
const PORT = 8080;
const DB_URI = "mongodb://localhost:27017/project_ecom";
```

> Consider moving these to a `.env` file using the `dotenv` package for better configuration management.

---

## Planned / In Progress

- [ ] Role-based access control
- [ ] Profile image upload
- [ ] Password hashing (bcrypt)
- [ ] JWT authentication
- [ ] Product and order management

---

## License

ISC
