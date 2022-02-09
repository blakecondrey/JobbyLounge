import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";

import { BadRequestError, UnauthenticatedError } from "../errors/index.js";

const register = async (req, res, next) => {
  // requires registrant to provide all values -> await User.create(req.body)
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values.");
  }

  // unique variable testing to check for email in use instead
  // of relying on error message to check for existence
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use.");
  }

  const user = await User.create({ name, email, password });

  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastname: user.lastName,
      location: user.location,
      name: user.name,
    },
    token,
    location: user.location,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values.");
  }
  // password is currently hidden using "select: false"
  // override select: false with ".select("+password") to compare
  // password in isPasswordCorrect await function
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials.");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials.");
  }
  // recreate JWT
  const token = user.createJWT();
  // programmatically set visible and hashed password to undefined
  user.password = undefined;
  // set status to json excluding undefined password
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError("Please provide all values.");
  }

  const user = await User.findOne({ _id: req.user.userId });
  console.log(req.user);

  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  // await User.findOneAndUpdate would avoid the errors, however, this
  // is to showcase potential errors that could occur with password hashing
  // and salting as it currently contains { password: { select: false} }
  await user.save();

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user,
    token,
    location: user.location,
  });
};

export { register, login, updateUser };
