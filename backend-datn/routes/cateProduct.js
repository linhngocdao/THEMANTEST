import express from "express";
import { isAdmin, isAuth, requireSignin } from "../middlewares/checkAuth";
import {
  createCate,
  listCate,
  listCates,
  readCate,
  removeCate,
  updateCate,
} from "../controllers/cateProduct";
const router = express.Router();

router.post("/cateproduct", requireSignin, isAuth, isAdmin, createCate);
router.get("/cateproducts", listCate);
router.get("/cateproduct", listCates);
router.get("/cateproduct/:id", readCate);
router.delete("/cateproduct/:id", requireSignin, isAuth, isAdmin, removeCate);
router.put("/cateproduct/:id", requireSignin, isAuth, isAdmin, updateCate);

export default router;
