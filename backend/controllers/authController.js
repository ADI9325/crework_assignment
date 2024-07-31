const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Register a new user
const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user and save
    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login an existing user
const loginUser = async (req, res) => {
                    try {
                      const { email, password } = req.body;
                  
                      const user = await User.findOne({ email });
                      if (!user) {
                        console.log('User not found');
                        return res.status(400).json({ message: 'Invalid credentials' });
                      }
                  
                      console.log('User found:', user);
                  
                      const isMatch = await user.comparePassword(password);
                    //   console.log('Password comparison result:', isMatch);
                  
                      if (!isMatch) {
                        return res.status(400).json({ message: 'Invalid credentials' });
                      }
                  
                      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
                      res.json({ token });
                    } catch (error) {
                      console.error('Login error:', error);
                      res.status(500).json({ error: error.message });
                    }
                  };
                  
                  
// Logout functionality
const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: 'Logout failed' });
    res.json({ message: 'Logged out successfully' });
  });
};

module.exports = { register, loginUser, logoutUser };
