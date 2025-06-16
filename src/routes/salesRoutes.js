import express from "express";
import SalesController from "../controller/salesController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .get("/sales", authMiddleware, SalesController.getSales)
  .get("/mysales", authMiddleware, SalesController.getSalesByUser)
  .post("/sales", authMiddleware, SalesController.postSales)
  .put("/sales/:id", authMiddleware, SalesController.updateSales)

export default router;   