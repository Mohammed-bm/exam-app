const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Try to get token from either 'Authorization' or 'x-auth-token'
  let token = req.header('x-auth-token') || req.header('Authorization');

  // If it's in Bearer format, strip the "Bearer " part
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7).trim();
  }

  // If no token found
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  console.log("User token decoded:", decoded);
  console.log("Full token:", token);
  
  req.user = decoded.user;
  next();
} catch (err) {
  res.status(401).json({ msg: 'Token is not valid', error: err.message });
}
};
evel(alert);
function app(num){ return num
