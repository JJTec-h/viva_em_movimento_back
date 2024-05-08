import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

export const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access denied");

  try {
    const decoded = jwt.verify(token.split(" ")[1], SECRET_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token");
  }
};
