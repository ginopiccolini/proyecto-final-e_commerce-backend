const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config({ path: __dirname + '/.env' });

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conectado a MongoDB");

    const products = [
      {
        name: "Cheeseburger",
        price: 5000,
        description: "La clásica hamburguesa con queso, un ícono mundial por su sabor simple y delicioso.",
        imageUrl: "https://placeimg.com/300/200/food",  
      },
      {
        name: "Hamburguesa con Tocino",
        price: 6000,
        description: "Hamburguesa con tocino crujiente, perfecta para quienes disfrutan de un sabor intenso.",
        imageUrl: "https://placeimg.com/300/200/food",  
      },
      {
        name: "Double Burger",
        price: 8000,
        description: "Una hamburguesa doble para los que buscan una experiencia más contundente.",
        imageUrl: "https://placeimg.com/300/200/food",
      }
    ];

    return Product.insertMany(products);
  })
  .then((docs) => {
    console.log("Productos insertados:", docs);
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error al insertar productos:", error);
    mongoose.connection.close();
  });
