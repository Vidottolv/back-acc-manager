import express from "express";
import UsersController from "../controller/usersController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .get("/user", authMiddleware, UsersController.getCurrentUser)
//   .put("/user/:id", authMiddleware, UsersController.updateSales)

export default router;   