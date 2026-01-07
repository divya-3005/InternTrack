# InternTrack - Intelligent Job Application Tracker

A full-stack application to help you track your internship applications, built with the MERN stack (MongoDB, Express, React, Node) and Prisma.

## Features
- **Authentication**: Secure Signup and Login using JWT.
- **Dashboard**: Visual statistics of your application progress.
- **Job Tracking**: Add, edit, and delete job applications.
- **Status Management**: Track status (Applied, Interviewing, Offer, Rejected).
- **Premium UI**: Modern, dark-themed interface with glassmorphism effects.

## Prerequisites
- Node.js installed.
- A MongoDB Atlas account (for the database).

## Setup Instructions

### 1. Database Setup
1. Create a free account on [MongoDB Atlas](https://www.mongodb.com/atlas/database).
2. Create a new Cluster.
3. In "Database Access", create a database user.
4. In "Network Access", allow access from anywhere (0.0.0.0/0) or your IP.
5. Get your Connection String (Driver: Node.js).
6. Update the `.env` file in the `server` directory:
   ```
   DATABASE_URL="mongodb+srv://<username>:<password>@cluster0.mongodb.net/intern-track?retryWrites=true&w=majority"
   ```

### 2. Backend Setup
```bash
cd server
npm install
npx prisma generate
npm run dev
```
The server will start on `http://localhost:5000`.

### 3. Frontend Setup
Open a new terminal:
```bash
cd client
npm install
npm run dev
```
The client will start on `http://localhost:5173`.

## Tech Stack
- **Frontend**: React (Vite), Vanilla CSS (CSS Variables).
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB Atlas, Prisma ORM.
- **Auth**: JWT, Bcrypt.
