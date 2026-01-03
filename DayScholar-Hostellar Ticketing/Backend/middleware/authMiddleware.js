const jwt = require("jsonwebtoken");

const JWT_SECRET = "myhostellarsecret";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token)
    return res.status(401).json({ message: "Access Denied: No Token" });

  try {
    const actualToken = token.split(" ")[1];
    const decoded = jwt.verify(actualToken, JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
