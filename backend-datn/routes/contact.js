import express from "express";
import {
  createContact,
  filter_contact,
  listContact,
  readContact,
  removeContact,
  updateContact,
} from "../controllers/contact";

const router = express.Router();

router.post("/contact", createContact);
router.put("/contact/:id", updateContact);
router.post("/contact/filter", filter_contact);
router.get("/contacts", listContact);
router.get("/contact/:id", readContact);
router.delete("/contact/:id", removeContact);

export default router;
