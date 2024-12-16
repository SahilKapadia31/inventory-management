import express from "express";
import multer from "multer";
import {
  getInventory,
  addInventory,
  updateInventory,
  deleteInventory,
  exportInventory,
  importInventory,
  getLowStock,
} from "../controllers/inventoryController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/get", getInventory);
router.post("/add", addInventory);
router.put("/update/:id", updateInventory);
router.delete("/delete/:id", deleteInventory);
router.get("/export", exportInventory);
router.post("/import", upload.single("file"), importInventory);
router.get("/low-stock", getLowStock);

export default router;
