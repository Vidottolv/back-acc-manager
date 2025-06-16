import express from "express";
import ProductController from "../controller/productController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .get("/products", authMiddleware, ProductController.getProducts)
  .get("/myproducts", authMiddleware, ProductController.getProductsByUser)
  .post("/products", authMiddleware, ProductController.postProduct)
  .put("/products/:id", authMiddleware, ProductController.updateProduct)

export default router;   