import express from "express";

import {
  listUser,
  readUser,
  signin,
  signup,
  updateUsers,
  verifyEmail,
  forgetPassword,
  sendResetPasswordTokenStatus,
  resetPassword,
  updateProfile,
  filter_user,
} from "../controllers/user";
const router = express.Router();
import { isAdmin, isAuth, requireSignin } from "../middlewares/checkAuth";
import { isValidPassResetToken } from "../middlewares/user";

router.post("/users", listUser);
router.put("/user/:id", requireSignin, isAuth, updateUsers);
router.get("/user/:id", readUser);
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/user/filter", filter_user);
router.put("/profile", requireSignin, isAuth, updateProfile);
router.get("/verify/:id", verifyEmail);
router.post("/forget-password", forgetPassword);
router.post(
  "/verify-pass-reset-token",
  isValidPassResetToken,
  sendResetPasswordTokenStatus
);
router.post("/reset-password", isValidPassResetToken, resetPassword);

export default router;
