import asyncHandler from "express-async-handler";
import { User } from "../models/index.js";
import { generateToken } from "../utils/generateToken.js";

/** @description Auth user & get token
 *  @route POST /api/users/login
 *  @access Public
 */
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const isPasswordValid = await user?.matchPassword(password);

  if (isPasswordValid) {
    const { _id, name, email, isAdmin } = user;
    res.json({
      _id,
      name,
      email,
      isAdmin,
      token: generateToken(_id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

/** @description Register a new user
 *  @route POST /api/users
 *  @access Public
 */
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const { _id, isAdmin } = user;

  if (user) {
    res.status(201).json({
      _id,
      name,
      email,
      isAdmin,
      token: generateToken(_id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/** @description Get user profile
 *  @route GET /api/users/profile
 *  @access Private
 */
export const getUserProfile = asyncHandler(async (req, res) => {
  if (req.user) {
    const { _id, name, email, isAdmin } = req.user;
    res.json({
      _id,
      name,
      email,
      isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

/** @description Update user profile
 *  @route PUT /api/users/profile
 *  @access Private
 */
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) user.password = req.body.password

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  }
  else {
    res.status(404);
    throw new Error("User not found!");
  }
});
