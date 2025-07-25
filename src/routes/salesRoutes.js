import express from "express";
import SalesController from "../controller/salesController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .get("/sales", authMiddleware, SalesController.getSales)
  .get("/mysales", authMiddleware, SalesController.getSalesByUser)
  .get("/sales/currentmonth", authMiddleware, SalesController.getMonthlySales)
  .post("/sales", authMiddleware, SalesController.postSales)
  .put("/sales/:id", authMiddleware, SalesController.updateSales)

export default router;   