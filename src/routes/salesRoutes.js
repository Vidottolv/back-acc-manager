import express from "express";
import SalesController from "../controller/salesController.js";
// import pagination from "../middlewares/pagination.js";

const router = express.Router();

router
  .get("/sales", SalesController.getSales)
  .post("/sales", SalesController.postSales)
  .put("/sales/:id", SalesController.updateSales)

export default router;   