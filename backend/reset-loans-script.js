// Reset Loan Applications Script
// Run this with: node reset-loans-script.js

require('dotenv').config();
const mongoose = require('mongoose');

async function resetLoans() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/loan_app';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Delete all loan applications
    const LoanApplication = mongoose.model('LoanApplication', new mongoose.Schema({}, { strict: false }));
    const result = await LoanApplication.deleteMany({});
    
    console.log(`✅ Deleted ${result.deletedCount} loan applications`);
    console.log('You can now apply for new loans and they will stay PENDING for officers to review');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

resetLoans();
