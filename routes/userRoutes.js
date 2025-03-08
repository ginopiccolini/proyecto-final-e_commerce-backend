// routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

// Ruta para registro de usuario
router.post('/register', registerUser);

// Ruta para login de usuario
router.post('/login', loginUser);

module.exports = router;
