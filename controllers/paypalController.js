const paypal = require('@paypal/checkout-server-sdk');

// Configura el entorno de PayPal en modo Sandbox con tus credenciales
function environment() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  return new paypal.core.SandboxEnvironment(clientId, clientSecret);
}

function client() {
  return new paypal.core.PayPalHttpClient(environment());
}

// En CLP no se usan decimales, así que el total debe ser un entero mayor que 0
const createOrder = async (req, res) => {
  try {
    const { total } = req.body; // total se espera en CLP (por ejemplo, 5000 para 5000 CLP)
    // Verifica que total > 0
    if (total <= 0) {
      return res.status(400).json({ message: 'El total debe ser mayor que cero.' });
    }
    // Configuramos la orden con moneda CLP
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'CLP',       // Se establece en CLP
          value: total.toString(),    // Asegúrate de convertir a string
        },
      }],
    });
    const order = await client().execute(request);
    return res.status(201).json(order.result);
  } catch (error) {
    console.error('Error al crear la orden PayPal:', error);
    return res.status(500).json({ message: 'Error al crear la orden', error: error.toString() });
  }
};

const captureOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});
    const capture = await client().execute(request);
    return res.status(200).json(capture.result);
  } catch (error) {
    console.error('Error al capturar la orden:', error);
    return res.status(500).json({ message: 'Error al capturar la orden', error: error.toString() });
  }
};

module.exports = { createOrder, captureOrder };
