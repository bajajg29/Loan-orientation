const LoanApplication = require('../models/LoanApplication');
const LoanOfficer = require('../models/LoanOfficer');
const loanService = require('../services/loanService');

async function getPending(req, res) {
  try {
    const pending = await LoanApplication.find({ status: 'PENDING' }).populate('customerId');
    return res.json({ pending });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function reviewLoan(req, res) {
  const id = req.params.id;
  const { action } = req.body; // { action: 'APPROVE' | 'REJECT' }
  if (!['APPROVE','REJECT'].includes(action)) return res.status(400).json({ message: 'Invalid action' });
  try {
    const loan = await LoanApplication.findById(id);
    if (!loan) return res.status(404).json({ message: 'Not found' });

    // Calculate eligibility score before officer review
    try {
      await loanService.evaluateLoan(loan._id);
      // Reload loan to get the calculated eligibility score
      await loan.reload();
    } catch (evalErr) {
      console.error('Error calculating eligibility:', evalErr);
      // Continue with manual review even if auto-calculation fails
    }

    // find officer document for this user
    let officer = await LoanOfficer.findOne({ userId: req.user.userId });
    if (!officer) officer = await LoanOfficer.create({ userId: req.user.userId });

    loan.officerId = officer._id;
    loan.status = action === 'APPROVE' ? 'APPROVED' : 'REJECTED';
    await loan.save();
    return res.json({ message: `Loan ${loan.status.toLowerCase()}` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { getPending, reviewLoan };
