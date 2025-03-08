// backend/controllers/paypalController.js

const paypal = require('@paypal/checkout-server-sdk');

/**
 * Configurar el entorno de PayPal en modo Sandbox.
 * Asegúrate de tener en tu .env:
 * PAYPAL_CLIENT_ID=<TU_CLIENT_ID_DE_PRUEBA>
 * PAYPAL_CLIENT_SECRET=<TU_CLIENT_SECRET_DE_PRUEBA>
 */
function environment() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  return new paypal.core.SandboxEnvironment(clientId, clientSecret);
}

/**
 * Retorna el cliente de PayPal para realizar las operaciones
 */
function client() {
  return new paypal.core.PayPalHttpClient(environment());
}

/**
 * Crea una orden de PayPal
 * @param req.body.total Monto total a cobrar (ej. 100)
 * @param req.body.currency Moneda (ej. 'USD')
 */
const createOrder = async (req, res) => {
  try {
    const { total, currency } = req.body;

    // Configuramos la solicitud de creación de orden
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: currency, // Ej: 'USD'
            value: total.toString(), // Asegúrate de convertir a string
          },
        },
      ],
    });

    // Ejecutamos la creación de la orden
    const order = await client().execute(request);
    // order.result contendrá toda la información de la orden
    return res.status(201).json(order.result);
  } catch (error) {
    console.error('Error al crear la orden PayPal:', error);
    return res.status(500).json({
      message: 'Error al crear la orden',
      error: error.toString(),
    });
  }
};

/**
 * Captura una orden de PayPal (finaliza el pago)
 * @param req.params.orderId ID de la orden a capturar
 */
const captureOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({}); // Sin contenido adicional

    const capture = await client().execute(request);
    // capture.result contendrá la confirmación del pago
    return res.status(200).json(capture.result);
  } catch (error) {
    console.error('Error al capturar la orden:', error);
    return res.status(500).json({
      message: 'Error al capturar la orden',
      error: error.toString(),
    });
  }
};

module.exports = {
  createOrder,
  captureOrder,
};
