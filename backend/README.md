# Backend — Loan Origination & Approval System

A Node.js + Express + MongoDB backend for managing loan applications with JWT authentication and role-based access control.

## 🚀 Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing

## 📁 Project Structure

```
backend/
├── src/
│   ├── models/           # Mongoose schemas
│   │   ├── User.js
│   │   ├── Customer.js
│   │   ├── LoanOfficer.js
│   │   └── LoanApplication.js
│   ├── controllers/      # Request handlers
│   │   ├── authController.js
│   │   ├── loanController.js
│   │   └── officerController.js
│   ├── routes/          # API routes
│   │   ├── auth.js
│   │   ├── loan.js
│   │   └── officer.js
│   ├── services/        # Business logic
│   │   └── loanService.js
│   ├── middleware/      # Auth middleware
│   │   └── authMiddleware.js
│   ├── utils/          # Helper functions
│   │   └── auth.js
│   └── index.js        # Server entry point
├── seed.js             # Database seeding
├── package.json
└── .env.example
```

## ⚙️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Create a `.env` file in the backend directory:

```env
MONGO_URI=mongodb://localhost:27017/loan_app
JWT_SECRET=your-super-secret-jwt-key-change-in-production
PORT=5000
```

### 3. Start MongoDB

Make sure MongoDB is running:

```bash
# Local MongoDB
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGO_URI in .env with your Atlas connection string
```

### 4. Seed Database (Optional)

Create test users:

```bash
npm run seed
```

This creates:
- **Customer:** alice@example.com / P@ssw0rd
- **Officer:** bob@example.com / P@ssw0rd

### 5. Start Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000
```

### Authentication

All endpoints except `/auth/*` require JWT token in header:
```
Authorization: Bearer <token>
```

---

### 🔐 Auth Endpoints

#### Register User
```http
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123",
  "role": "CUSTOMER"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "userId": "6915a..."
}
```

**Notes:**
- `role` can be: `CUSTOMER` or `OFFICER`
- Password is automatically hashed with bcrypt
- Creates corresponding Customer or LoanOfficer record

---

#### Login User
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "userId": "6915a...",
  "role": "CUSTOMER"
}
```

---

### 💰 Loan Endpoints

#### Apply for Loan
```http
POST /loans/apply
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "amountRequested": 50000,
  "tenureMonths": 24
}
```

**Response:**
```json
{
  "loanId": "6915b...",
  "message": "Loan application submitted."
}
```

**Notes:**
- Customer ID is automatically derived from JWT token
- Loan status is set to `PENDING`
- Officers will review and approve/reject

---

#### Get Loan Status
```http
GET /loans/:id/status
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "status": "APPROVED",
  "eligibilityScore": 0.7523
}
```

**Status Values:**
- `PENDING` - Awaiting officer review
- `APPROVED` - Loan approved
- `REJECTED` - Loan rejected

---

### 👔 Officer Endpoints (OFFICER role only)

#### Get Pending Loans
```http
GET /officer/loans/pending
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "pending": [
    {
      "_id": "6915b...",
      "customerId": {
        "_id": "6915a...",
        "userId": "69159...",
        "income": 50000,
        "creditScore": 720
      },
      "amountRequested": 50000,
      "tenureMonths": 24,
      "status": "PENDING",
      "createdAt": "2025-11-13T10:15:00.000Z"
    }
  ]
}
```

---

#### Review Loan (Approve/Reject)
```http
POST /officer/loans/:id/review
```

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "action": "APPROVE"
}
```

**Action Values:**
- `APPROVE` - Approve the loan
- `REJECT` - Reject the loan

**Response:**
```json
{
  "message": "Loan approved"
}
```

**Notes:**
- Automatically calculates eligibility score
- Updates loan status
- Associates loan with reviewing officer

---

## 🧮 Loan Eligibility Scoring

The system automatically calculates an eligibility score using:

**Formula:**
```
score = (0.6 × creditScore_normalized) + (0.4 × income_normalized)
```

**Normalization Ranges:**
- Credit Score: 300-850
- Income: 0-2,000,000

**Threshold Logic:**
- Base threshold: 0.4
- +0.1 for loans > $200,000
- +0.2 for loans > $500,000

**Implementation:** See `src/services/loanService.js`

---

## 🗄️ Database Models

### User
```javascript
{
  name: String,
  email: String (unique),
  passwordHash: String,
  role: "CUSTOMER" | "OFFICER",
  timestamps: true
}
```

### Customer
```javascript
{
  userId: ObjectId (ref: User),
  income: Number,
  creditScore: Number
}
```

### LoanOfficer
```javascript
{
  userId: ObjectId (ref: User),
  branch: String
}
```

### LoanApplication
```javascript
{
  customerId: ObjectId (ref: Customer),
  officerId: ObjectId (ref: LoanOfficer),
  amountRequested: Number,
  tenureMonths: Number,
  interestRate: Number,
  status: "PENDING" | "APPROVED" | "REJECTED",
  eligibilityScore: Number,
  timestamps: true
}
```

---

## 🛠️ Available Scripts

```bash
# Start server (production)
npm start

# Start with auto-reload (development)
npm run dev

# Seed database with test users
npm run seed

# Check loan applications in database
node check-loans.js

# Reset all loan applications
node reset-loans-script.js
```

---

## 🔒 Security Features

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT token authentication
- ✅ Role-based access control
- ✅ Protected routes with middleware
- ✅ MongoDB ObjectId validation
- ✅ Input validation on all endpoints

---

## 🐛 Troubleshooting

### "MongoDB connection failed"
- Ensure MongoDB is running: `mongod`
- Check MONGO_URI in `.env` file
- For Atlas, verify network access and credentials

### "JWT secret not set"
- Create `.env` file with `JWT_SECRET=your-secret-key`
- Restart the server after adding

### "Cannot find module"
- Run `npm install` to install dependencies
- Ensure you're in the backend directory

### "Port already in use"
- Change PORT in `.env` to another port (e.g., 5001)
- Or kill the process using port 5000

---

## 📝 Notes

- Default customer credit score: 600
- Default customer income: 0
- Loans stay PENDING until officer reviews them
- Eligibility score is calculated during officer review
- JWT tokens don't expire (add expiry in production)

---

## 🚀 Production Deployment

Before deploying to production:

1. Change `JWT_SECRET` to a strong random string
2. Use MongoDB Atlas or managed MongoDB
3. Add JWT token expiration
4. Enable CORS for frontend domain only
5. Add rate limiting
6. Enable HTTPS
7. Add proper error logging
8. Set `NODE_ENV=production`
