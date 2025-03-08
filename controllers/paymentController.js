// backend/controllers/paymentController.js
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body; // Asegúrate de enviar el monto en CLP
    // Para CLP, Stripe es una moneda sin decimales, por lo que el monto se envía tal cual
    const paymentIntent = await stripe.paymentIntents.create({
      amount,         // Ejemplo: 5000 = 5000 CLP
      currency: 'clp' // Cambiado a pesos chilenos
    });
    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error al crear PaymentIntent:', error);
    return res.status(500).json({ message: 'Error al crear PaymentIntent' });
  }
};

module.exports = { createPaymentIntent };
