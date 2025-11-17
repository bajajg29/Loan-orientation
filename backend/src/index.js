require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRouter = require('./routes/auth');
const loanRouter = require('./routes/loan');
const officerRouter = require('./routes/officer');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/loans', loanRouter);
app.use('/officer', officerRouter);

const PORT = process.env.PORT || 4000;

// If JWT_SECRET is not set, provide a safe fallback for local development only.
if (!process.env.JWT_SECRET) {
  if (process.env.NODE_ENV === 'production') {
    console.error('ERROR: JWT_SECRET is not set. In production this is required. Exiting.');
    process.exit(1);
  } else {
    // Development fallback (NOT for production). This enables running locally without a .env file.
    process.env.JWT_SECRET = 'dev_jwt_secret_change_me';
    console.warn('WARNING: JWT_SECRET not set. Using development fallback secret. Set JWT_SECRET in .env to a strong secret.');
  }
}

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/loan_app', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    if (!process.env.JWT_SECRET) {
      console.warn('WARNING: JWT_SECRET is not set. Authentication tokens cannot be issued until this is configured. See .env.example');
    }
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error', err.message || err);
    // exit code omitted to allow local debugging when MongoDB is not available
  });
