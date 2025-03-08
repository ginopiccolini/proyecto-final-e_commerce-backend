// backend/controllers/productController.js
const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener productos' });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al obtener el producto' });
  }
};

module.exports = { getProducts, getProductById };
