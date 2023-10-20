const jwt = require("jsonwebtoken");

require('dotenv').config({ path: '../src/.env' });

const jwtSecret = process.env.JWTSECRET;
 



module.exports = function(req, res, next) {
  // Get token from the request headers
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Verify the token with the JWTSECRET stored in process.env
    const decoded = jwt.verify(token, jwtSecret);

    // Attach the decoded user data to the request object
    req.user = decoded.user;

    // Continue to the next middleware or route handler
    next();
  } catch (err) {
    // If token verification fails, return an error response
    return res.status(401).json({ msg: "Token is not valid" });
  }
};
