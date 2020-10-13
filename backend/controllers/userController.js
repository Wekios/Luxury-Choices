import asyncHandler from "express-async-handler";
import { User } from "../models/index.js";
import { generateToken } from "../utils/generateToken.js";

/** @description Auth user & get token
 *  @route POST /api/users/login
 *  @access Public
 */
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
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
