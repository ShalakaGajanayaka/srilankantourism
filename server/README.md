# Sri Lanka Tourism - Backend Server

Backend server for Sri Lanka Tourism MERN stack application.

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Project Structure

```
server/
├── config/
│   └── database.js       # MongoDB connection
├── middleware/
│   └── auth.js           # Authentication middleware
├── models/
│   ├── User.js           # User model
│   ├── Tour.js           # Tour model
│   ├── Hotel.js          # Hotel model
│   ├── Transport.js      # Transport model
│   └── Restaurant.js     # Restaurant model
├── routes/
│   ├── auth.js           # Authentication routes
│   └── tours.js          # Tour routes
├── .env.example          # Environment variables example
├── .gitignore
├── package.json
├── server.js             # Main server file
└── README.md
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration:
- MongoDB connection string
- JWT secret
- Port number

## Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## API Endpoints

### Health Check
- `GET /api/health` - Server health check

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Tours
- `GET /api/tours` - Get all tours
- `GET /api/tours/:id` - Get single tour
- `POST /api/tours` - Create a tour (Protected/Admin)

## Environment Variables

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret key
- `JWT_EXPIRE` - JWT expiration time
- `FRONTEND_URL` - Frontend URL for CORS

## MongoDB Setup

### Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Update `MONGODB_URI` in `.env`:
```
MONGODB_URI=mongodb://localhost:27017/srilanka-tourism
```

### MongoDB Atlas (Cloud)
1. Create a MongoDB Atlas account
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/srilanka-tourism?retryWrites=true&w=majority
```

## Development

The server runs on `http://localhost:5000` by default.

Use `nodemon` for auto-restart during development:
```bash
npm run dev
```

