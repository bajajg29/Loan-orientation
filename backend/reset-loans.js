// Delete all existing loan applications to start fresh
// Run this in MongoDB Compass or MongoDB Shell

// In MongoDB Compass:
// 1. Go to loan_app database
// 2. Go to loanapplications collection
// 3. Click "DELETE" button for each document
// OR use the query below

// In MongoDB Shell or Compass Query:
db.loanapplications.deleteMany({})

// This will remove all existing loans so you can test with fresh PENDING loans
