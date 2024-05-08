// src/controllers/authController.js

import User from "../model/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error("SECRET_KEY is not defined");
}

export const register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashedPassword });
  res.status(201).send("User registered");
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ username: user.username }, SECRET_KEY, {
      expiresIn: "4h",
    });
    res.json({ token });
  } else {
    res.status(401).send("Invalid credentials");
  }
};
