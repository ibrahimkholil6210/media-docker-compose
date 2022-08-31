const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("authorization");
  if (!token) res.status(401).send("Access Denied");
  
  try {
    const user = jwt.verify(token?.split(' ')[1], process.env.TOKEN_SECRET);
    if (user) req.user = user;
    next();
  } catch (e) {
    res.status(400).send("Invalid credentials");
  }
};

module.exports = authMiddleware;