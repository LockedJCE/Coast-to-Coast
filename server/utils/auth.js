const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secret = process.env.JWT_SECRET;
const expiration = '2h';

module.exports = {
  signToken: function({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
  verifyToken: function(token) {
    try {
      return jwt.verify(token, secret);
    } catch (err) {
      console.log('Invalid token');
      return null;
    }
  },
};