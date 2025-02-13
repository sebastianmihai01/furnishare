# E-Commerce Platform

A modern e-commerce platform built with TypeScript, Node.js, Express, and MongoDB.

## Features

- 🔐 JWT Authentication & Authorization
- 🛍️ Product Management
- 🛒 Shopping Cart
- 📦 Order Processing
- 🖼️ AWS S3 Image Upload
- 🔍 Product Search & Filtering
- 📱 Responsive Design
- 🔒 Rate Limiting & Security
- 🚀 Clustering for Performance

## Tech Stack

### Backend

- Node.js & Express
- TypeScript
- MongoDB with Mongoose
- JWT Authentication
- AWS S3 Integration
- Express Rate Limit
- Helmet Security
- CORS

### Infrastructure

- Docker Support
- PM2 Process Management
- Clustering
- Error Handling
- Logging System

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB
- AWS Account (for S3)
- TypeScript

### Environment Variables

env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
AWS_ACCESS_KEY=your_aws_access_key
AWS_SECRET_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_BUCKET_NAME=your_bucket_name

## Auth Routes

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh-token` - Refresh access token
- `POST /api/auth/logout` - Logout user

### Product Routes

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### User Routes

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/listings` - Get user listings

### Cart Routes

- `GET /api/cart` - Get cart
- `POST /api/cart/add` - Add to cart
- `DELETE /api/cart/:productId` - Remove from cart
- `DELETE /api/cart/clear` - Clear cart
