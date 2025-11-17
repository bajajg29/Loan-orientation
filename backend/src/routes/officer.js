const express = require('express');
const router = express.Router();
const { authMiddleware, authorizeRole } = require('../middleware/authMiddleware');
const officerController = require('../controllers/officerController');

router.get('/loans/pending', authMiddleware, authorizeRole('OFFICER'), officerController.getPending);
router.post('/loans/:id/review', authMiddleware, authorizeRole('OFFICER'), officerController.reviewLoan);

module.exports = router;
