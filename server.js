// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Importamos las rutas
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paypalRoutes = require('./routes/paypalRoutes'); // ← Rutas de PayPal

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.error('Error conectando a MongoDB:', error));

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de usuario, productos y órdenes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Rutas de PayPal
app.use('/api/paypal', paypalRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor corriendo: ¡Hola desde Express!');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
