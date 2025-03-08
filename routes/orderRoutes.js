const express = require('express');
const { createOrder, getOrderById } = require('../controllers/orderController');

const router = express.Router();

// Ruta para crear una orden
router.post('/', createOrder);

// Ruta para obtener una orden por ID
router.get('/:id', getOrderById);

module.exports = router;
