import express from "express";
import { isAdmin, isAuth, requireSignin } from "../middlewares/checkAuth";

import {
  createColor,
  listColor,
  readColor,
  removeColor,
  updateColor,
} from "../controllers/color";

const router = express.Router();

router.post("/color", requireSignin, isAuth, isAdmin, createColor);
router.get("/color", listColor);
router.get("/color/:id", readColor);
router.delete("/color/:id", requireSignin, isAuth, isAdmin, removeColor);
router.put("/color/:id", requireSignin, isAuth, isAdmin, updateColor);

export default router;
