import express from 'express'
import { addCart, getCart, removeCart, updateCart } from '../controllers/carts'
const router = express.Router()
 
router.post("/carts", addCart)
router.get("/carts/:id", getCart)
router.put("/carts/:id", updateCart)
router.delete("/carts/:id", removeCart)
export default router