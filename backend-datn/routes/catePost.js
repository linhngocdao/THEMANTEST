import express from "express";
import { isAdmin, isAuth, requireSignin } from "../middlewares/checkAuth";
import {
  createCate,
  listCate,
  readCate,
  removeCate,
  updateCate,
} from "../controllers/catePost";

const router = express.Router();

router.post("/catepost", requireSignin, isAuth, isAdmin, createCate);
router.get("/catepost", listCate);
router.get("/catepost/:id", readCate);
router.delete("/catepost/:id", requireSignin, isAuth, isAdmin, removeCate);
router.put("/catepost/:id", requireSignin, isAuth, isAdmin, updateCate);

export default router;
