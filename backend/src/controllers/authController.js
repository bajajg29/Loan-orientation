const User = require('../models/User');
const Customer = require('../models/Customer');
const LoanOfficer = require('../models/LoanOfficer');
const { hashPassword, comparePassword, signToken } = require('../utils/auth');

async function register(req, res) {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) return res.status(400).json({ message: 'Missing fields' });
  if (!['CUSTOMER','OFFICER'].includes(role)) return res.status(400).json({ message: 'Invalid role' });
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });
    const passwordHash = await hashPassword(password);
    const user = await User.create({ name, email, passwordHash, role });
    if (role === 'CUSTOMER') {
      await Customer.create({ userId: user._id });
    } else if (role === 'OFFICER') {
      await LoanOfficer.create({ userId: user._id });
    }
    return res.json({ message: 'User registered successfully', userId: user._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await comparePassword(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    let token;
    try {
      token = signToken({ userId: user._id, role: user.role });
    } catch (err) {
      console.error('Failed to sign JWT:', err.message || err);
      return res.status(500).json({ message: 'Server misconfiguration: JWT secret not set' });
    }
    return res.json({ token, userId: user._id, role: user.role });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { register, login };
