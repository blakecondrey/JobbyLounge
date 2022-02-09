import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
  // autheader is a string, split it on the space, (Bearer, space, and token)
  // then, select the second value/element.
  // split() turns it into a array, 2nd element will be at [1] and
  // will be the token
  const token = authHeader.split(" ")[1];

  try {
    // payload is what is being passed in
    // i.e: returning { userId: this._id }
    // UserSchema.methods.createJWT = function () {
    //   return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    //     expiresIn: process.env.JWT_LIFETIME,
    //   });
    // };
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // log payload
    // attach user req object
    // req.user = payload
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

export default auth;
