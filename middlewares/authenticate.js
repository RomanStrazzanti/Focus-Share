// middlewares/authenticate.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET;

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header manquant' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token manquant' });
  }

  try {
    const decoded = jwt.verify(token, SUPABASE_JWT_SECRET);
    req.user = { id: decoded.sub }; // stocke l'UUID de l'utilisateur dans req.user
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token invalide' });
  }
}

module.exports = authenticate;