const config = require("../config/index");
const jwt = require("jsonwebtoken");

const tokenSignForUser =  ({ userId, expiresIn = "8h" }) => {
  return jwt.sign({ userId }, config.jwt.secret, {
    expiresIn,
  });
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    return decoded;
  } catch (error) {
    throw new Error("Token verification failed");
  }
};

module.exports = {
  tokenSignForUser,
  verifyToken
};
