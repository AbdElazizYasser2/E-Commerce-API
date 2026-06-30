# E-Commerce API

A scalable and production-ready E-Commerce REST API built with **Node.js**, **Express.js**, **TypeScript**, and **MongoDB** following a modular architecture.

---

## Features

- Authentication & Authorization (JWT)
- User Management
- Products Management
- Categories
- Brands
- Wishlist
- Shopping Cart
- Orders
- Payments
- Coupons
- Reviews & Ratings
- User Addresses
- Shipping Methods
- Notifications
- Settings
- Internationalization (i18n)
- Security Best Practices
- Email Services
- Validation
- Compression
- Rate Limiting
- Request Logging
- Global Error Handling

---

# Tech Stack

### Backend

- Node.js
- Express.js
- TypeScript

### Database

- MongoDB
- Mongoose

### Authentication

- JWT

### Validation

- Express Validator

### Security

- Helmet
- CORS
- HPP
- Express Rate Limit

### Utilities

- Nodemailer
- Compression
- i18next
- Morgan
  
---

# Installation

Clone the repository

```bash
git clone https://github.com/your-username/ecommerce-api.git
```

Install dependencies

```bash
npm install
```

Create environment variables

```bash
cp .env.example .env
```

Run development server

```bash
npm run dev
```

Build project

```bash
npm run build
```

Run production

```bash
npm start
```

---

# Scripts

```bash
npm run dev
```

Start development server.

```bash
npm run build
```

Compile TypeScript.

```bash
npm start
```

Run production server.

```bash
npm run seed
```

Seed database.

---

# Authentication

This API uses **JWT Authentication**.

Protected routes require:

```
Authorization: Bearer <token>
```

---

# Security

The API includes:

- Helmet
- CORS
- Rate Limiting
- HPP Protection
- Password Hashing
- JWT Authentication
- Request Validation
- Global Error Handling

---

# Future Improvements

- Docker Support
- Redis Caching
- Cloudinary Image Upload
- Swagger Documentation
- Unit Testing
- Integration Testing
- CI/CD Pipeline
- Background Jobs (BullMQ)
- Elasticsearch
- Payment Gateway Integration

---
