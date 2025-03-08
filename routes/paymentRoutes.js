// backend/routes/paymentRoutes.js

const express = require('express');
const { createPaymentIntent } = require('../controllers/paymentController');

const router = express.Router();

// Ruta para crear un PaymentIntent
router.post('/create-payment-intent', createPaymentIntent);

module.exports = router;
