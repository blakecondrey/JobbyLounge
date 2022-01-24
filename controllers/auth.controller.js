import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";

const register = async (req, res, next) => {
  // requires registrant to provide all values -> await User.create(req.body)
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  res.send("Login User");
};
const updateUser = async (req, res) => {
  res.send("Update User");
};

export { register, login, updateUser };
