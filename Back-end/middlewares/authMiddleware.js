require('dotenv').config();
const jwt = require('jsonwebtoken')
const User = require('../models/user');


const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // ✅ check if header is eavailable
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // ✅ check token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ جلب المستخدم وإضافته للطلب
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) return res.status(401).json({ message: 'User not found.' });

    next(); // ✅ كل شيء تمام
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
