# Frontend — Loan Origination & Approval System

A modern React frontend for the Loan Management System with beautiful UI, JWT authentication, and role-based dashboards.

## 🚀 Tech Stack

- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Bootstrap 5** - CSS framework
- **Bootstrap Icons** - Icon library
- **React Toastify** - Toast notifications
- **Context API** - State management

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html        # HTML template
├── src/
│   ├── components/       # React components
│   │   ├── Navbar.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── CustomerDashboard.js
│   │   └── OfficerDashboard.js
│   ├── services/        # API & Auth services
│   │   ├── api.js       # Axios configuration
│   │   └── authContext.js  # Auth context provider
│   ├── App.js           # Main app with routing
│   ├── index.js         # Entry point
│   └── index.css        # Global styles
├── package.json
└── README.md
```

## ⚙️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Backend URL

The frontend connects to backend at `http://localhost:5000` by default.

To change this, edit `src/services/api.js`:

```javascript
const api = axios.create({
  baseURL: 'http://localhost:YOUR_PORT'
});
```

### 3. Start Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`

---

## 🎨 Features

### Authentication
- ✅ User registration with role selection
- ✅ Login with JWT token
- ✅ Token stored in localStorage
- ✅ Auto-logout functionality
- ✅ Protected routes with role-based access

### Customer Dashboard
- ✅ Apply for loans (amount + tenure)
- ✅ Check loan application status
- ✅ View eligibility score
- ✅ Color-coded status badges (Pending/Approved/Rejected)

### Officer Dashboard
- ✅ View all pending loan applications
- ✅ See customer details (income, credit score)
- ✅ Approve or reject loans
- ✅ Real-time updates after actions
- ✅ Empty state when no pending loans

### UI/UX
- ✅ Modern gradient theme (purple)
- ✅ Responsive card-based layout
- ✅ Bootstrap icons throughout
- ✅ Smooth animations and transitions
- ✅ Toast notifications for all actions
- ✅ Beautiful form designs
- ✅ Mobile-responsive

---

## 🎯 User Flows

### Customer Flow

1. **Register/Login**
   - Navigate to `/register` or `/login`
   - Enter credentials
   - System redirects to `/customer` dashboard

2. **Apply for Loan**
   - Enter loan amount and tenure
   - Click "Submit Application"
   - Receive loan ID in response

3. **Check Status**
   - Enter loan ID
   - Click "Check" button
   - View status and eligibility score

### Officer Flow

1. **Login**
   - Navigate to `/login`
   - Enter officer credentials
   - System redirects to `/officer` dashboard

2. **Review Loans**
   - See list of pending applications
   - View customer details and loan info
   - Click "Approve" or "Reject"

3. **Verify**
   - Click "Refresh" to reload pending loans
   - Empty state shows when all reviewed

---

## 📚 Available Pages

### Public Routes
- `/login` - Login page
- `/register` - Registration page

### Protected Routes
- `/customer` - Customer dashboard (CUSTOMER role only)
- `/officer` - Officer dashboard (OFFICER role only)

### Auto-Redirects
- `/` → `/login` (if not authenticated)
- Unauthorized role access → `/login`

---

## 🔐 Authentication System

### How It Works

1. **Login:**
   - User enters credentials
   - Backend returns JWT token + user info
   - Frontend stores in localStorage
   - Token added to all API requests

2. **Token Storage:**
```javascript
localStorage.setItem('loan_user', JSON.stringify({
  token: "jwt_token",
  userId: "user_id",
  role: "CUSTOMER" | "OFFICER"
}))
```

3. **API Headers:**
```javascript
Authorization: Bearer <jwt_token>
```

4. **Logout:**
   - Clears localStorage
   - Removes auth header
   - Redirects to login

---

## 🎨 Design System

### Color Palette
```css
Primary: #667eea (Purple)
Secondary: #764ba2 (Deep Purple)
Success: #11998e (Teal)
Danger: #ee0979 (Pink-Red)
Background: Linear gradient (#667eea → #764ba2)
```

### Components

**Navbar:**
- Sticky top position
- White background with shadow
- Role badge (color-coded)
- Login/Register or Logout buttons

**Cards:**
- Rounded corners (16px)
- Subtle shadows
- Hover effects (lift animation)
- Gradient headers

**Buttons:**
- Rounded (10px)
- Gradient backgrounds
- Shadow on hover
- Icon + text labels

**Forms:**
- Label with icons
- Rounded inputs (10px)
- Focus states (purple border)
- Inline validation

**Status Badges:**
- `PENDING` - Yellow background
- `APPROVED` - Green background
- `REJECTED` - Red background

---

## 🛠️ Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject (irreversible)
npm run eject
```

---

## 📦 Key Dependencies

```json
{
  "react": "^18.x",
  "react-router-dom": "^6.x",
  "axios": "^1.x",
  "react-toastify": "^9.x"
}
```

**External Resources:**
- Bootstrap 5.3.2 (CDN)
- Bootstrap Icons 1.10.5 (CDN)
- Google Fonts: Inter

---

## 🐛 Troubleshooting

### "Cannot connect to backend"
- Ensure backend is running on port 5000
- Check `baseURL` in `src/services/api.js`
- Verify CORS is enabled on backend

### "Login not working"
- Check if MongoDB is running
- Verify JWT_SECRET is set in backend `.env`
- Check browser console for errors

### "Blank page after npm start"
- Clear browser cache
- Delete `node_modules` and run `npm install`
- Check console for errors

### "Role badge not showing"
- Check if user data is in localStorage
- Verify token payload includes `role` field
- Try logging out and back in

---

## 🔄 State Management

### Auth Context

Located in `src/services/authContext.js`

**Methods:**
- `login(email, password)` - Authenticate user
- `register(userData)` - Create new user
- `logout()` - Clear session
- `user` - Current user object

**Usage:**
```javascript
import { useAuth } from './services/authContext';

const { user, login, logout } = useAuth();
```

---

## 🎯 Test Accounts

After running backend seed:

| Email | Password | Role | Dashboard |
|-------|----------|------|-----------|
| alice@example.com | P@ssw0rd | CUSTOMER | /customer |
| bob@example.com | P@ssw0rd | OFFICER | /officer |

---

## 📱 Responsive Design

- **Desktop:** Full 2-column layout
- **Tablet:** Stacked cards, responsive navbar
- **Mobile:** Single column, touch-friendly buttons

Breakpoints:
- `lg`: 992px and above
- `md`: 768px - 991px
- `sm`: 576px - 767px
- `xs`: Below 576px

---

## 🚀 Production Build

```bash
# Create optimized build
npm run build

# Output directory: build/
# Deploy build/ folder to hosting service
```

**Deployment Options:**
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

**Before deploying:**
1. Update `baseURL` in `api.js` to production backend URL
2. Enable production backend CORS for your domain
3. Test all features in production mode

---

## 🎥 Demo Video Script

See `DEMO_SCRIPT.md` in project root for complete step-by-step guide to record demo video.

---

## 💡 Future Enhancements

- [ ] Loan history for customers
- [ ] Search and filter in officer dashboard
- [ ] Email notifications
- [ ] Document upload for loan applications
- [ ] Password reset functionality
- [ ] User profile management
- [ ] Loan calculator widget
- [ ] Dark mode toggle

---

## 📝 Notes

- Backend must be running before starting frontend
- All forms have built-in validation
- Toast notifications auto-dismiss after 3 seconds
- Private routes auto-redirect unauthorized users
- Token persists across page refreshes

---

## 🆘 Support

For issues or questions:
1. Check console logs (F12 in browser)
2. Verify backend is running and accessible
3. Check network tab for API call errors
4. Review `DEMO_SCRIPT.md` for correct workflow
