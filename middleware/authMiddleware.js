const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Vérifie si un token est présent dans l'entête Authorization
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Récupération du token (après "Bearer ")
      token = req.headers.authorization.split(' ')[1];

      // Vérification du token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Récupération de l'utilisateur (sans le mot de passe)
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Non autorisé, token invalide' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Non autorisé, aucun token fourni' });
  }
};

module.exports = { protect };
