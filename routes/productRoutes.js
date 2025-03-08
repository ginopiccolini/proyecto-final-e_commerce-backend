// backend/routes/productRoutes.js
const express = require('express');
const { getProducts, getProductById } = require('../controllers/productController');
const authMiddleware = require('../middlewares/authmiddleware');

const router = express.Router();

// Ruta pública: Obtener todos los productos
router.get('/', getProducts);

// Ruta pública: Obtener un producto específico por su ID
router.get('/:id', getProductById);

// Ruta protegida: Ejemplo para crear un producto (aún no implementado en el controlador)
// router.post('/', authMiddleware, createProduct);

module.exports = router;
