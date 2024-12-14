const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized, token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user details to the request object
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized, invalid token' });
  }
};

module.exports = authMiddleware;
