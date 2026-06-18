import express from "express";
import { createOrder, getOrders, myOrders, updateOrderStatus } from "../controllers/orderController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.post("/", createOrder);
router.get("/my-orders", myOrders);
router.get("/", adminOnly, getOrders);
router.put("/:id/status", adminOnly, updateOrderStatus);

export default router;
