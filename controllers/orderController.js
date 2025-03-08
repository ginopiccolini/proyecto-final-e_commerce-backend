// backend/controllers/orderController.js
const Order = require('../models/Order');

const createOrder = async (req, res) => {
  try {
    const { user, products, total } = req.body;
    // Aquí podrías agregar validaciones adicionales
    const order = new Order({
      user,
      products,
      total,
      paymentStatus: 'paid', // Asumimos que el pago fue exitoso (ajusta según tu flujo)
    });

    await order.save();
    return res.status(201).json({ message: 'Orden creada exitosamente', order });
  } catch (error) {
    console.error('Error al crear la orden:', error);
    return res.status(500).json({ message: 'Error al crear la orden' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id)
      .populate('user', 'email name')
      .populate('products.product', 'name price description');
    if (!order) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }
    return res.status(200).json(order);
  } catch (error) {
    console.error('Error al obtener la orden:', error);
    return res.status(500).json({ message: 'Error al obtener la orden' });
  }
};

module.exports = { createOrder, getOrderById };
