# 🏦 Loan Origination & Approval System

A full-stack loan management application built with **Node.js**, **Express**, **MongoDB**, and **React**. Features JWT authentication, role-based access control, automatic eligibility scoring, and a beautiful modern UI.

![Tech Stack](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)

---

## 📋 Project Overview

This system allows:
- **Customers** to register, apply for loans, and track application status
- **Loan Officers** to review applications and approve/reject them
- **System** to automatically calculate loan eligibility scores based on credit score and income

---

## ✨ Key Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (Customer vs Officer)
- Secure password hashing with bcrypt
- Token-based session management

### 💰 Loan Management
- Customer loan application (amount + tenure)
- Automatic eligibility scoring algorithm
- Real-time status tracking (Pending/Approved/Rejected)
- Officer review and approval workflow

### 🎨 Modern UI/UX
- Beautiful gradient design theme
- Responsive Bootstrap layout
- Toast notifications for all actions
- Card-based interface with smooth animations
- Bootstrap Icons throughout

### 🗄️ Database
- MongoDB with Mongoose ODM
- Four collections: Users, Customers, LoanOfficers, LoanApplications
- Proper relationships with references
- Automatic timestamp tracking

---

## 🏗️ Project Structure

```
loan/
├── backend/                 # Node.js + Express backend
│   ├── src/
│   │   ├── models/         # Mongoose schemas
│   │   ├── controllers/    # Request handlers
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic (loan scoring)
│   │   ├── middleware/     # Auth middleware
│   │   ├── utils/          # Helper functions
│   │   └── index.js        # Server entry
│   ├── seed.js             # Database seeding
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── frontend/               # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API client & Auth context
│   │   ├── App.js          # Main app with routing
│   │   ├── index.js
│   │   └── index.css       # Global styles
│   ├── package.json
│   └── README.md
│
├── DEMO_SCRIPT.md          # Video demo guide
├── QUICK_START.md          # Quick setup guide
└── README.md               # This file
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1️⃣ Clone Repository

```bash
git clone <repository-url>
cd loan
```

### 2️⃣ Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
MONGO_URI=mongodb://localhost:27017/loan_app
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
EOF

# Seed database with test users
npm run seed

# Start backend server
npm run dev
```

**Test Accounts Created:**
- Customer: `alice@example.com` / `P@ssw0rd`
- Officer: `bob@example.com` / `P@ssw0rd`

### 3️⃣ Setup Frontend

```bash
# Open new terminal
cd frontend

# Install dependencies
npm install

# Start React app
npm start
```

### 4️⃣ Access Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

---

## 🎯 User Guide

### For Customers

1. **Register** → Create account with role "Customer"
2. **Login** → Use email and password
3. **Apply for Loan** → Enter amount and tenure
4. **Check Status** → View approval status and eligibility score

### For Loan Officers

1. **Login** → Use officer credentials
2. **View Pending Loans** → See all loan applications waiting for review
3. **Review & Decide** → Approve or reject each application
4. **Refresh** → Update list to see remaining pending loans

---

## 📊 Loan Eligibility Algorithm

The system calculates a score based on:

```
Eligibility Score = (0.6 × normalized_credit_score) + (0.4 × normalized_income)
```

**Normalization:**
- Credit Score: 300-850 range
- Income: $0-$2,000,000 range

**Approval Threshold:**
- Base: 0.4
- +0.1 for loans > $200,000
- +0.2 for loans > $500,000

**Example:**
- Credit Score: 720, Income: $60,000, Loan: $50,000
- Normalized: 0.76, 0.03
- Score: (0.6 × 0.76) + (0.4 × 0.03) = 0.468
- Threshold: 0.4 → **Approved** ✅

---

## 🛠️ API Documentation

### Auth APIs

```http
POST /auth/register
POST /auth/login
```

### Loan APIs (Protected)

```http
POST /loans/apply
GET /loans/:id/status
```

### Officer APIs (Protected, Officer role only)

```http
GET /officer/loans/pending
POST /officer/loans/:id/review
```

**Full API documentation:** See `backend/README.md`

---

## 🗄️ Database Schema

### User
```javascript
{
  name, email, passwordHash, role: "CUSTOMER" | "OFFICER"
}
```

### Customer
```javascript
{
  userId (ref: User), income, creditScore
}
```

### LoanOfficer
```javascript
{
  userId (ref: User), branch
}
```

### LoanApplication
```javascript
{
  customerId (ref: Customer),
  officerId (ref: LoanOfficer),
  amountRequested,
  tenureMonths,
  status: "PENDING" | "APPROVED" | "REJECTED",
  eligibilityScore
}
```

---

## 🎬 Demo Video

Follow `DEMO_SCRIPT.md` for step-by-step guide to record a 10-12 minute demo video showing:

1. Customer registration and login
2. Loan application submission
3. Officer login and review
4. Approval/rejection workflow
5. Status verification

---

## 🧪 Testing

### Test User Accounts

| Email | Password | Role |
|-------|----------|------|
| alice@example.com | P@ssw0rd | CUSTOMER |
| bob@example.com | P@ssw0rd | OFFICER |

### Test Scenarios

1. **Small Loan ($5,000)** → Usually approved
2. **Medium Loan ($200,000)** → Depends on credit
3. **Large Loan ($600,000)** → High threshold

---

## 📦 Tech Stack Details

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Auth:** jsonwebtoken + bcrypt
- **Dev Tools:** nodemon

### Frontend
- **Library:** React 18
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **UI Framework:** Bootstrap 5
- **Icons:** Bootstrap Icons
- **Notifications:** React Toastify
- **State:** Context API

---

## 🔒 Security Features

- ✅ Password hashing (bcrypt, 10 rounds)
- ✅ JWT token authentication
- ✅ Role-based access control
- ✅ Protected API routes
- ✅ Input validation
- ✅ MongoDB ObjectId validation
- ✅ CORS configuration

---

## 🐛 Troubleshooting

### Backend won't start
- Check if MongoDB is running: `mongod`
- Verify `.env` file exists with correct values
- Run `npm install` to install dependencies

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check `baseURL` in `frontend/src/services/api.js`
- Verify CORS is enabled in backend

### "No pending loans" in officer dashboard
- Make sure customer applied a loan
- Check if loan status is PENDING (not already approved/rejected)
- Delete old loans and apply new ones

**More troubleshooting:** See individual README files in backend/ and frontend/

---

## 📚 Documentation

- [Backend Documentation](./backend/README.md) - API, setup, database
- [Frontend Documentation](./frontend/README.md) - Components, routing, UI
- [Demo Script](./DEMO_SCRIPT.md) - Video recording guide
- [Quick Start](./QUICK_START.md) - Fast setup commands

---

## 🎯 Project Requirements Checklist

### Core Features ✅
- [x] User registration with role selection
- [x] JWT authentication
- [x] Customer can apply for loans
- [x] Customer can view loan status
- [x] Officer can view pending loans
- [x] Officer can approve/reject loans
- [x] Automatic eligibility scoring
- [x] Role-based access control

### Technical Requirements ✅
- [x] Node.js + Express backend
- [x] MongoDB + Mongoose
- [x] React frontend
- [x] JWT authentication
- [x] REST API design
- [x] Modular code structure
- [x] Error handling
- [x] Input validation

### Bonus Features ✅
- [x] Beautiful modern UI with gradients
- [x] Toast notifications
- [x] Responsive design
- [x] Bootstrap integration
- [x] Icon library
- [x] Smooth animations
- [x] Seed data script
- [x] Comprehensive documentation

---

## 🚀 Deployment

### Backend
1. Deploy to Heroku, Railway, or AWS
2. Use MongoDB Atlas for database
3. Set environment variables
4. Update frontend API URL

### Frontend
1. Build: `npm run build`
2. Deploy to Vercel, Netlify, or AWS S3
3. Update backend CORS settings
4. Configure environment variables

---

## 📝 Future Enhancements

- [ ] Email notifications for loan status
- [ ] Document upload for applications
- [ ] Loan history page for customers
- [ ] Advanced filtering in officer dashboard
- [ ] Export loan reports
- [ ] Multi-factor authentication
- [ ] Password reset via email
- [ ] Admin dashboard
- [ ] Analytics and reporting

---

## 👨‍💻 Development

### Run in Development

```bash
# Backend (with auto-reload)
cd backend && npm run dev

# Frontend (with hot reload)
cd frontend && npm start
```

### Available Scripts

**Backend:**
```bash
npm start          # Production server
npm run dev        # Development server
npm run seed       # Seed database
```

**Frontend:**
```bash
npm start          # Development server
npm run build      # Production build
npm test           # Run tests
```

---

## 📄 License

This project is created for educational purposes.

---

## 🙏 Acknowledgments

- Built as part of Node.js + React evaluation project
- Uses open-source libraries and frameworks
- UI inspired by modern fintech applications

---

## 📞 Support

For questions or issues:
1. Check individual README files
2. Review DEMO_SCRIPT.md for workflow
3. Verify all prerequisites are installed
4. Check console logs for errors

---

**Made with ❤️ using Node.js, Express, MongoDB, and React**

---

## 🎬 Ready to Demo?

1. ✅ Backend running with MongoDB
2. ✅ Frontend running on localhost:3000
3. ✅ Test accounts seeded
4. ✅ Follow DEMO_SCRIPT.md
5. ✅ Record your 10-12 minute video

**Good luck! 🚀**
