# Vaccine Immunization System Backend

A Node.js and Express.js backend application for managing vaccine immunization records and communication between patients and healthcare providers.

## Features

- User authentication (JWT)
- Role-based access control (Patient/Provider)
- Vaccination record management
- Messaging system between users
- MongoDB database integration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vaccine-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
```

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Vaccinations
- GET `/api/vaccinations` - Get all vaccinations (protected)
- POST `/api/vaccinations` - Create new vaccination record (provider only)
- PATCH `/api/vaccinations/:id` - Update vaccination record (provider only)
- GET `/api/vaccinations/patient/:patientId` - Get patient's vaccination records

### Messages
- POST `/api/messages` - Send a message
- GET `/api/messages/conversation/:userId` - Get messages between two users
- GET `/api/messages/conversations` - Get all conversations for a user

## Error Handling

The API includes comprehensive error handling for:
- Authentication errors
- Validation errors
- Database errors
- Route not found errors

## Security

- Password hashing using bcrypt
- JWT-based authentication
- Role-based access control
- Input validation
- CORS protection

## Modules
    Key Node.js Modules to Use:
    express — Core server framework

    jsonwebtoken — JWT authentication

    bcrypt — Password hashing

    crypto — Encrypt/decrypt sensitive fields

    mongoose — MongoDB ODM

    socket.io — Real-time messaging

    helmet — Security headers

    cors — Cross-Origin handling

    express-rate-limit — Rate limiting APIs

    dotenv — Managing environment variables securely
## Testing

Run tests using:
```bash
npm test
```

## License

MIT 