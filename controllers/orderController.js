const Order = require('../models/Order');

const createOrder = async (req, res) => {
  try {
    const { user, products, total, paymentId, paymentStatus } = req.body;
    const order = new Order({ user, products, total, paymentId, paymentStatus });
    await order.save();
    return res.status(201).json({ message: 'Orden creada exitosamente', order });
  } catch (error) {
    console.error('Error al crear la orden:', error);
    return res.status(500).json({ message: 'Error al crear la orden' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'email name')
      .populate('products.product', 'name price description');
    if (!order) return res.status(404).json({ message: 'Orden no encontrada' });
    return res.status(200).json(order);
  } catch (error) {
    console.error('Error al obtener la orden:', error);
    return res.status(500).json({ message: 'Error al obtener la orden' });
  }
};

module.exports = { createOrder, getOrderById };
