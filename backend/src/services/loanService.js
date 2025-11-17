const LoanApplication = require('../models/LoanApplication');
const Customer = require('../models/Customer');

/**
 * Normalize a value between min and max to 0..1
 */
function normalize(value, min, max) {
  if (max === min) return 0;
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
}

/**
 * Evaluate loan application eligibility using customer data.
 * score = 0.6 * creditScoreNorm + 0.4 * incomeNorm
 * threshold varies with amountRequested (example heuristic)
 */
async function evaluateLoan(applicationId) {
  const app = await LoanApplication.findById(applicationId);
  if (!app) throw new Error('Application not found');
  const customer = await Customer.findById(app.customerId);
  if (!customer) throw new Error('Customer not found');

  // For normalization bounds, use some reasonable finance ranges
  const creditMin = 300, creditMax = 850; // typical credit score range
  const incomeMin = 0, incomeMax = 2000000; // annual income

  const creditNorm = normalize(customer.creditScore || 600, creditMin, creditMax);
  const incomeNorm = normalize(customer.income || 0, incomeMin, incomeMax);

  const score = 0.6 * creditNorm + 0.4 * incomeNorm;

  // threshold heuristic: larger loans require higher score
  // e.g., base threshold 0.4, add 0.2 for loans > 500k, 0.1 for >200k
  let threshold = 0.4;
  if (app.amountRequested > 500000) threshold += 0.2;
  else if (app.amountRequested > 200000) threshold += 0.1;

  const status = score >= threshold ? 'APPROVED' : 'REJECTED';

  app.eligibilityScore = Number(score.toFixed(4));
  app.status = status;
  await app.save();
  return { status: app.status, eligibilityScore: app.eligibilityScore };
}

module.exports = { evaluateLoan };
