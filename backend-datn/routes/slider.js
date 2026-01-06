import express from "express";
import {
  createSliders,
  listSliders,
  readSliders,
  removeSliders,
  updateSliders,
} from "../controllers/slider";
import { isAdmin, isAuth, requireSignin } from "../middlewares/checkAuth";

const router = express.Router();

router.post("/slider", requireSignin, isAuth, isAdmin, createSliders);
router.post("/sliders", listSliders);
router.get("/slider/:id", readSliders);
router.delete("/slider/:id", requireSignin, isAuth, isAdmin, removeSliders);
router.put("/slider/:id", requireSignin, isAuth, isAdmin, updateSliders);

export default router;
