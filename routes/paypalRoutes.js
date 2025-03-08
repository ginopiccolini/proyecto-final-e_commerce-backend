// backend/routes/paypalRoutes.js
const express = require('express');
const { createOrder, captureOrder } = require('../controllers/paypalController');

const router = express.Router();

// Ruta para crear una orden de PayPal
router.post('/create-order', createOrder);

// Ruta para capturar una orden de PayPal
router.post('/capture-order/:orderId', captureOrder);

module.exports = router;
