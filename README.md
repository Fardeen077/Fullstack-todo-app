# Fullstack Todo App
LIVE LINK --> 
A production-ready Full Stack Todo Application with secure user authentication and user-specific task management, built using the MERN Stack.

## Features

- User Registration & Login using JWT Authentication
- Secure password hashing with bcrypt
- Create, Read, Update, Delete (CRUD) Todos
- Todos are user-specific
- Protected routes (JWT-based authorization)
- Responsive UI using Tailwind CSS
- Clean REST API architecture
- Ready for deployment

## Tech Stack

## Frontend
- React
- Tailwind CSS
- Axios
- React Router DOM

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcryptjs

## Dev Tools
- Nodemon
- VS Code
-Git & GitHub


## Environment Variables
PORT=8000
MONGODB_URL=your_mongodb_connection_string
ACCESS_TOKEN_SECRE=your_jwt_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=YOUR_REFRESH_SECRET

## Application Logic
- User registers or logs in using email & password
- Passwords are hashed using bcrypt
- Backend generates Access & Refresh Tokens
- JWT is verified using middleware for protected routes
- Each todo is linked to a specific user ID
- Users can only access their own todos
- All CRUD operations interact with MongoDB via Mongoose

## API Routes
-- Auth Routes 
POST /register      → Register user
POST /login         → Login user
POST /logout        → Logout user (Protected)
GET  /me            → Get logged-in user (Protected)

-- Todo Routes
GET    /todo         → Get all todos
POST   /todo         → Create todo
PUT    /todo/:id     → Update todo
PATCH  /todo/:id     → Update todo status
DELETE /todo/:id     → Delete todo

## Setup

### Backend
-- 1. Go to backend folder:
-- ```bash
-- cd server

## Screenshot

![Todo App UI](client/public/todo-app.png)


## Author
Mohd Fardeen
MERN Stack Developer