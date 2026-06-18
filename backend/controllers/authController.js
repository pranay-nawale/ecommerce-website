import jwt from "jsonwebtoken";
import User from "../models/User.js";

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

const sendAuth = (res, user, statusCode = 200) => {
  res.status(statusCode).json({
    token: signToken(user._id),
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: "Email already registered" });

    const user = await User.create({ name, email, password });
    sendAuth(res, user, 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    sendAuth(res, user);
  } catch (error) {
    next(error);
  }
};

export const me = async (req, res) => {
  res.json({ user: req.user });
};

export const forgotPassword = async (req, res) => {
  res.json({ message: "Password reset flow placeholder. Connect an email provider in production." });
};
