import express from "express";
import CustomerController from "../controller/customerController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .get("/customer", authMiddleware, CustomerController.getCustomers)
  .post("/customer", authMiddleware, CustomerController.postCustomer)
  .put("/customer/:id", authMiddleware, CustomerController.updateCustomer)

export default router; 