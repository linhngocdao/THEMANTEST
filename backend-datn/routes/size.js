import express from "express";
import {
  createSize,
  listSize,
  readSize,
  removeSize,
  updateSize,
} from "../controllers/size";
import { isAdmin, isAuth, requireSignin } from "../middlewares/checkAuth";

const router = express.Router();

router.post("/size", requireSignin, isAuth, isAdmin, createSize);
router.get("/size", listSize);
router.get("/size/:id", readSize);
router.delete("/size/:id", requireSignin, isAuth, isAdmin, removeSize);
router.put("/size/:id", requireSignin, isAuth, isAdmin, updateSize);

export default router;
