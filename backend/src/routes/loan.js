const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const loanController = require('../controllers/loanController');

router.post('/apply', authMiddleware, loanController.applyLoan);
router.get('/:id/status', authMiddleware, loanController.getStatus);

module.exports = router;
