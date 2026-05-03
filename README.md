# 🛒 E-Commerce API

A fully-featured RESTful E-Commerce API built with Node.js, Express, and MongoDB.


---

## 🚀 Features

- 🔐 **Authentication & Authorization** — JWT-based auth with role-based access control (Admin, Customer, Vendor)
- 👤 **User Management** — Register, Login, Profile, Change Password, Forgot/Reset Password
- 🛍️ **Products** — Full CRUD with image upload, search, filtering, sorting, and pagination
- 📦 **Orders** — Cash, Stripe, and Fawry payment support
- 🛒 **Cart** — Add, remove, and update cart items
- ❤️ **Wishlist** — Save favorite products
- ⭐ **Reviews** — Product reviews with auto-calculated ratings
- 🏷️ **Coupons** — Discount coupons with expiration dates
- 📂 **Categories & Brands** — Full CRUD with image upload
- 🚚 **Shipping Methods** — Multiple shipping options
- 💳 **Transactions** — Payment transaction history
- 📍 **Addresses** — User shipping/billing addresses
- 🖼️ **Image Processing** — Auto resize and convert to WebP using Sharp
- 🔍 **Advanced Filtering** — Filter, sort, search, field limiting, and pagination
- 🛡️ **Security** — Rate limiting, CORS, data sanitization
- 🧪 **Testing** — Integration tests with Jest and Supertest

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| **Node.js** | Runtime |
| **Express.js** | Web Framework |
| **MongoDB** | Database |
| **Mongoose** | ODM |
| **JWT** | Authentication |
| **bcryptjs** | Password Hashing |
| **Multer** | File Upload |
| **Sharp** | Image Processing |
| **Stripe** | Online Payment |
| **Jest** | Testing |
| **Morgan** | Logging |

---

## ⚙️ Installation

### 1. Clone the repo
```bash
git clone https://github.com/AbdElazizYasser2/YOUR-REPO-NAME.git
cd YOUR-REPO-NAME
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
```bash
cp .env.example .env
```

Fill in the `.env` file:
```env
PORT=3000
NODE_ENV=development

MONGO_URI=mongodb://localhost:27017/ecommerce
MONGO_URI_TEST=mongodb://localhost:27017/ecommerce_test

JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=90d

BASE_URL=http://localhost:3000

STRIPE_SECRET_KEY=sk_test_your_stripe_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### 4. Run seeders
```bash
npm run seed
```

### 5. Start the server
```bash
# Development
npm run dev

# Production
npm start
```

---

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage
```

---

## 📡 API Endpoints

### 🔐 Auth
| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/v1/auth/register` | Public |
| POST | `/api/v1/auth/login` | Public |
| POST | `/api/v1/auth/logout` | Private |
| POST | `/api/v1/auth/forgot-password` | Public |
| POST | `/api/v1/auth/verify-reset-code` | Public |
| PUT | `/api/v1/auth/reset-password` | Public |
| PUT | `/api/v1/auth/change-password` | Private |
| GET | `/api/v1/auth/me` | Private |
| PUT | `/api/v1/auth/update-me` | Private |
| DELETE | `/api/v1/auth/delete-me` | Private |

### 👤 Users
| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/v1/users` | Admin |
| POST | `/api/v1/users` | Admin |
| GET | `/api/v1/users/:id` | Admin |
| PUT | `/api/v1/users/:id` | Admin |
| DELETE | `/api/v1/users/:id` | Admin |

### 🛍️ Products
| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/v1/products` | Public |
| POST | `/api/v1/products` | Admin |
| GET | `/api/v1/products/:id` | Public |
| PUT | `/api/v1/products/:id` | Admin |
| DELETE | `/api/v1/products/:id` | Admin |

### 📦 Orders
| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/v1/orders` | Admin |
| POST | `/api/v1/orders` | Private |
| GET | `/api/v1/orders/:id` | Private |
| PUT | `/api/v1/orders/:id` | Admin |
| DELETE | `/api/v1/orders/:id` | Admin |

### 💳 Payments
| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/v1/payments/cash` | Private |
| POST | `/api/v1/payments/stripe/create-intent` | Private |
| POST | `/api/v1/payments/stripe/confirm` | Private |
| POST | `/api/v1/payments/stripe/webhook` | Public |
| POST | `/api/v1/payments/fawry/create` | Private |
| POST | `/api/v1/payments/fawry/webhook` | Public |

### 🔍 Query Examples
```
GET /api/v1/products?keyword=iphone
GET /api/v1/products?price[gte]=1000&price[lte]=50000
GET /api/v1/products?sort=-price
GET /api/v1/products?fields=name,price
GET /api/v1/products?page=2&limit=10
```

---

## 🔒 Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Server port |
| `NODE_ENV` | Environment (development/production) |
| `MONGO_URI` | MongoDB connection string |
| `MONGO_URI_TEST` | MongoDB test connection string |
| `JWT_SECRET` | JWT secret key |
| `JWT_EXPIRES_IN` | JWT expiration time |
| `BASE_URL` | Base URL for image serving |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret |

---

