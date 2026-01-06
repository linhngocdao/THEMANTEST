import express from 'express'
import { addDiscount, checkVoucher, EditVoucher, getVoucher, getVouchers, removeDiscount } from '../controllers/discount'
const router = express.Router()
 
router.post("/discounts", addDiscount)
router.delete("/discounts/:id", removeDiscount)
router.put("/discounts/:id", EditVoucher)
router.get("/discounts/:id", getVoucher)
router.put("/checkvoucher/",checkVoucher)
router.get("/discounts", getVouchers)
export default router