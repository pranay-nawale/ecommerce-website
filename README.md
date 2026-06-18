# ShopSphere E-Commerce

Full-stack e-commerce application built with React, Vite, Tailwind CSS, Node.js, Express, MongoDB, Mongoose, JWT, and bcrypt.

## Project Structure

```text
frontend/
  src/
    assets/
    components/
    context/
    hooks/
    layouts/
    pages/
    routes/
    services/
backend/
  config/
  controllers/
  middleware/
  models/
  routes/
  server.js
```

## Requirements

- Node.js 18+
- MongoDB Atlas or local MongoDB
- npm

## Environment Variables

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/shopsphere
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Installation

```bash
cd backend
npm install
npm run dev
```

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:5173`
Backend health check: `http://localhost:5000/api/health`

## Demo Admin

Register normally, then update the user's role to `admin` in MongoDB for dashboard access:

```js
db.users.updateOne({ email: "admin@example.com" }, { $set: { role: "admin" } });
```

## Deployment Guide

1. Create a MongoDB Atlas database and copy the connection string.
2. Deploy `backend/` to Render, Railway, Fly.io, or an AWS Node host.
3. Set backend environment variables: `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `CLIENT_URL`.
4. Deploy `frontend/` to Vercel or Netlify.
5. Set `VITE_API_URL` to your deployed backend URL plus `/api`.
6. Configure backend CORS `CLIENT_URL` to your deployed frontend URL.
7. Run `npm run build` in `frontend/` before static deployment.

## API Overview

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products` admin
- `PUT /api/products/:id` admin
- `DELETE /api/products/:id` admin
- `GET /api/cart`
- `POST /api/cart`
- `PUT /api/cart/:productId`
- `DELETE /api/cart/:productId`
- `GET /api/wishlist`
- `POST /api/wishlist/:productId`
- `DELETE /api/wishlist/:productId`
- `POST /api/orders`
- `GET /api/orders/my-orders`
- `GET /api/orders` admin
- `GET /api/admin/analytics` admin
