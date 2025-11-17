// Quick Database Check Script
// Run this to see what's in your loanapplications collection
// Run with: node check-loans.js

require('dotenv').config();
const mongoose = require('mongoose');

async function checkLoans() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/loan_app';
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB\n');

    const LoanApplication = mongoose.model('LoanApplication', new mongoose.Schema({
      customerId: mongoose.Schema.Types.ObjectId,
      amountRequested: Number,
      tenureMonths: Number,
      status: String,
      eligibilityScore: Number,
      createdAt: Date
    }, { collection: 'loanapplications' }));

    const loans = await LoanApplication.find({});
    
    console.log(`📊 Total Loans: ${loans.length}\n`);
    
    if (loans.length === 0) {
      console.log('❌ No loans found in database!');
      console.log('   👉 Apply a new loan as customer to test\n');
    } else {
      loans.forEach((loan, index) => {
        console.log(`Loan ${index + 1}:`);
        console.log(`  ID: ${loan._id}`);
        console.log(`  Amount: $${loan.amountRequested}`);
        console.log(`  Tenure: ${loan.tenureMonths} months`);
        console.log(`  Status: ${loan.status}`);
        console.log(`  Score: ${loan.eligibilityScore || 'N/A'}`);
        console.log(`  Created: ${loan.createdAt}\n`);
      });

      const pending = loans.filter(l => l.status === 'PENDING');
      const approved = loans.filter(l => l.status === 'APPROVED');
      const rejected = loans.filter(l => l.status === 'REJECTED');

      console.log('📈 Summary:');
      console.log(`  ⏳ PENDING: ${pending.length}`);
      console.log(`  ✅ APPROVED: ${approved.length}`);
      console.log(`  ❌ REJECTED: ${rejected.length}\n`);

      if (pending.length === 0 && (approved.length > 0 || rejected.length > 0)) {
        console.log('⚠️  WARNING: All loans are already approved/rejected!');
        console.log('   This means they were auto-evaluated before code fix.');
        console.log('   👉 Delete old loans and apply new ones to test officer review.\n');
      } else if (pending.length > 0) {
        console.log('✅ Good! You have pending loans for officers to review.\n');
      }
    }
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkLoans();
