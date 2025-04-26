const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

class AuthService {
  static async register(userData) {
    try {
      const user = await User.create(userData);
      const token = this.generateToken(user);
      return { user, token };
    } catch (error) {
      throw error;
    }
  }

  static async login(email, password) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        throw new Error('Invalid credentials');
      }

      const token = this.generateToken(user);
      return { user, token };
    } catch (error) {
      throw error;
    }
  }

  static generateToken(user) {
    return jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
  }

  static verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}

module.exports = AuthService; 