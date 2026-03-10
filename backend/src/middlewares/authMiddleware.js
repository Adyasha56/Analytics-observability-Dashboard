import { verifyToken } from '../utils/tokenUtils.js';

export const authMiddleware = (req, res, next) => {
  try {
    // Get token from cookies or Authorization header
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // Attach user info to request
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};