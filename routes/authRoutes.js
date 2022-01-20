import express from "express";
const router = express.Router();

import { register, login, updateUser } from "../controllers/auth.controller.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update_user").patch(updateUser);

export default router;
