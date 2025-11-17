const LoanApplication = require('../models/LoanApplication');
const mongoose = require('mongoose');
const Customer = require('../models/Customer');
const loanService = require('../services/loanService');

async function applyLoan(req, res) {
  let { customerId, amountRequested, tenureMonths } = req.body;
  if (!amountRequested || !tenureMonths) return res.status(400).json({ message: 'Missing fields' });
  try {
    // If customerId not provided, derive it from the authenticated user (typical customer flow)
    let customer;
    if (!customerId) {
      customer = await Customer.findOne({ userId: req.user.userId });
      if (!customer) return res.status(404).json({ message: 'Customer not found for current user' });
      customerId = customer._id;
    } else {
      customer = await Customer.findById(customerId);
      if (!customer) return res.status(404).json({ message: 'Customer not found' });
      // Only the owning customer or an officer may create an application for this customer
      if (req.user.role !== 'OFFICER' && String(req.user.userId) !== String(customer.userId)) {
        return res.status(403).json({ message: 'Forbidden: cannot apply for another customer' });
      }
    }
    const loan = await LoanApplication.create({ customerId, amountRequested, tenureMonths });
    // NOTE: Automatic evaluation disabled for demo - loans stay PENDING until officer reviews
    // Officers will manually approve/reject. Uncomment below to auto-evaluate:
    // await loanService.evaluateLoan(loan._id);
    return res.json({ loanId: loan._id, message: 'Loan application submitted.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function getStatus(req, res) {
  const id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid loan id' });
    const loan = await LoanApplication.findById(id).select('status eligibilityScore');
    if (!loan) return res.status(404).json({ message: 'Not found' });
    return res.json({ status: loan.status, eligibilityScore: loan.eligibilityScore });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { applyLoan, getStatus };
