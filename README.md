Proyecto Final E-commerce (Backend)
Descripción del Proyecto
Este es el backend para un proyecto de e-commerce. La aplicación está desarrollada con Node.js y Express y se conecta a una base de datos alojada en MongoDB Atlas. Además, incluye:

Autenticación de Usuarios: Registro e inicio de sesión con protección mediante JWT y cifrado de contraseñas (bcryptjs).
Gestión de Productos: Endpoints para listar y obtener el detalle de productos.
Gestión de Órdenes: Creación y consulta de órdenes de compra.
Integración de Pagos: Uso del SDK de PayPal para crear y capturar pagos en modo sandbox, configurado para CLP.
El backend está desplegado en Render.

Características
Registro e inicio de sesión con validación.
Listado y detalle de productos.
Carrito de compras (con incremento, decremento y eliminación de productos).
Procesamiento de pagos con PayPal.
Gestión de órdenes de compra.
Conexión a MongoDB Atlas para almacenamiento de datos.
Tecnologías Utilizadas
Lenguaje: JavaScript (Node.js)
Framework: Express
Base de Datos: MongoDB Atlas
Autenticación: JWT, bcryptjs
Pagos: @paypal/checkout-server-sdk
Otros: dotenv, cors, mongoose
Requisitos
Node.js (v14 o superior)
npm
Instalación
Clonar el repositorio:

bash
Copiar
git clone https://github.com/tu-usuario/proyecto-final-e_commerce.git
cd proyecto-final-e_commerce/backend
Instalar dependencias:

bash
Copiar
npm install
Configurar Variables de Entorno:

Crea un archivo .env en la raíz del backend con el siguiente contenido (reemplaza los valores con tus credenciales reales):

env
Copiar
MONGO_URI=mongodb+srv://<usuario>:<contraseña>@cluster0.mongodb.net/mi-base?retryWrites=true&w=majority
JWT_SECRET=tu_clave_secreta
PAYPAL_CLIENT_ID=tu_paypal_client_id_de_prueba
PAYPAL_CLIENT_SECRET=tu_paypal_client_secret_de_prueba
PORT=5000
(Opcional) Poblar la Base de Datos:

Si deseas insertar datos de prueba (por ejemplo, productos), ejecuta el script de semilla:

bash
Copiar
node seedProducts.js
Ejecución en Desarrollo
Para iniciar el servidor en modo desarrollo, ejecuta:

bash
Copiar
npm run dev
Esto utilizará nodemon para reiniciar el servidor automáticamente al detectar cambios.

Ejecución en Producción
Para ejecutar en producción:

bash
Copiar
npm start
Endpoints Principales
Usuarios:
POST /api/users/register – Registrar un nuevo usuario.
POST /api/users/login – Iniciar sesión y obtener token JWT.
Productos:
GET /api/products – Obtener lista de productos.
GET /api/products/:id – Obtener detalle de un producto.
Órdenes:
POST /api/orders – Crear una nueva orden de compra.
GET /api/orders/:id – Obtener detalle de una orden.
Pagos (PayPal):
POST /api/paypal/create-order – Crear orden de pago en PayPal.
POST /api/paypal/capture-order/:orderId – Capturar el pago.
Despliegue
El backend está desplegado en Render. Asegúrate de configurar las mismas variables de entorno en el panel de Render para que la aplicación funcione correctamente. Se recomienda utilizar el comando npm start y que el archivo server.js se encuentre en la raíz del proyecto.

Contribución
Si deseas contribuir, por favor abre un issue o envía un pull request.
¡Toda colaboración es bienvenida!
