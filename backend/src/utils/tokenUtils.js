import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Create JWT token
export const generateToken = (userId, username) => {
  const token = jwt.sign(
    { id: userId, username: username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY || '7d' }
  );
  return token;
};

// Verify JWT token
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    return null;
  }
};