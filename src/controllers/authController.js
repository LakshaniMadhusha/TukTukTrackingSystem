import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    province,
    district,
    policeStation
  } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(409);
    throw new Error("User already exists.");
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    province,
    district,
    policeStation
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully.",
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role)
    }
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password.");
  }

  res.json({
    success: true,
    message: "Login successful.",
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role)
    }
  });
});

export const getProfile = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: req.user
  });
});