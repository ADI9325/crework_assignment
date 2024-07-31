const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Access token from Authorization header
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded; // Store decoded token in request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticate;


// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');

// dotenv.config();

// const authenticate = (req, res, next) => {
//   const token = req.cookies.token; // Access token from cookies
//   if (!token) return res.status(401).json({ message: 'Access denied' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     req.user = decoded; // Store decoded token in request
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };


// module.exports = authenticate;