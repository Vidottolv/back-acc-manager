import express from "express";
import InstallmentController from "../controller/installmentController.js";
// import pagination from "../middlewares/pagination.js";

const router = express.Router();

router
  .get("/installments", InstallmentController.getSales)
  .post("/installments", InstallmentController.postSales)
  .put("/installments/:id", InstallmentController.updateSales)

export default router;   