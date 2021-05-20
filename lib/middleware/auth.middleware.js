const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  try {
    if (req.method === "OPTIONS") {
      return next();
    }

    if (!req.headers.authorization && req.route.path === "/:id") {
      return next();
    }
    const token = req.headers.authorization.split(" ")[1]; // "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({ message: "Нет авторизации" });
    }

    const decoded = jwt.verify(token, config.get("JWT_SECRET"));
    req.email = decoded.email;
    next();
  } catch (e) {
    console.log("e", e);
    res.status(401).json({ message: "Нет авторизации" });
  }
};
