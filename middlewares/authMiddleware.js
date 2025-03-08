const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Obtener el token del header 'Authorization'
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acceso no autorizado: Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1]; // Extrae el token

  try {
    // Verificar el token usando la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Agregar la información del usuario a la petición para usarla en rutas protegidas
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Acceso no autorizado: Token inválido o expirado' });
  }
};

module.exports = authMiddleware;
