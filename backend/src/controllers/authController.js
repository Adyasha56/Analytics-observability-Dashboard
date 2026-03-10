import User from '../models/User.js';
import { hashPassword, comparePassword } from '../utils/passwordUtils.js';
import { generateToken } from '../utils/tokenUtils.js';

//signup
export const register = async (req, res) => {
  try {
    const { username, password, age, gender } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await User.create({
      username,
      password: hashedPassword,
      age: age || null,
      gender: gender || null,
    });

    // Generate token
    const token = generateToken(user.id, user.username);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        username: user.username,
        age: user.age,
        gender: user.gender,
      },
      token,
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Registration failed' });
  }
};

//login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    // Find user
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare passwords
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user.id, user.username);

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        age: user.age,
        gender: user.gender,
      },
      token,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
};

//get curr user
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    res.json({
      user: {
        id: user.id,
        username: user.username,
        age: user.age,
        gender: user.gender,
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};