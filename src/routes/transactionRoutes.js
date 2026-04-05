import express from "express";
import {
  createTransaction,
  getTransactions,
  deleteTransaction,
} from "../controllers/transactionController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createTransaction);
router.get("/", protect, getTransactions);
router.delete("/:id", protect, deleteTransaction);

export default router;