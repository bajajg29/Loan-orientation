require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const Customer = require('./src/models/Customer');
const LoanOfficer = require('./src/models/LoanOfficer');
const { hashPassword } = require('./src/utils/auth');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await User.deleteMany({});
  await Customer.deleteMany({});
  await LoanOfficer.deleteMany({});

  const pass = await hashPassword('P@ssw0rd');
  const customerUser = await User.create({ name: 'Alice', email: 'alice@example.com', passwordHash: pass, role: 'CUSTOMER' });
  const officerUser = await User.create({ name: 'Bob', email: 'bob@example.com', passwordHash: pass, role: 'OFFICER' });
  await Customer.create({ userId: customerUser._id, income: 120000, creditScore: 720 });
  await LoanOfficer.create({ userId: officerUser._id, branch: 'Main' });
  console.log('Seeded users.');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
