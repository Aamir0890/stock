# Stock Dashboard

A monolithic stock tracking application with a React frontend and Express backend.

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Mongodb compass account 

## Installation and Setup

1. Clone the repository:
2. Install dependencies for both frontend and backend:
3. Set up environment variables:

Create a `.env` file in the root directory of backend and add:

DATABASE_URL=[Your database connection string] use Mongodb compass 
JWT_SECRET=[Your JWT secret key]

start both the servers seperately.
- `npm run dev`: Starts frontend 
- `nodemon app.js`: Starts only the backend server

## Usage

- The Express backend will be running on `http://localhost:8000`
- The React frontend will be accessible on `http://localhost:5173`
- API requests from the frontend to the backend should be prefixed with `http://localhost:8000`

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Starts frontend 
- `nodemon app.js`: Starts only the backend server


## Project Structure
project-root/
│
├── client/                     # React frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js          # Vite configuration for React
│
├── server/                     # Express backend
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── server.js               # Express app entry point
│   ├── .env                    # Environment variables
│   └── package.json            # Project dependencies and scripts
│
└── README.md                   # Project documentation


## API Endpoints

- POST /api/signup: Create a new user account
- POST /api/login: Authenticate a user
- GET /api/stocks: Retrieve list of available stocks
- POST /api/subscribe: Subscribe to a stock
