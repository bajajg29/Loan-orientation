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
