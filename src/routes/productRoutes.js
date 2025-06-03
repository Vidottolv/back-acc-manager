import express from "express";
import ProductController from "../controller/productController.js";
// import pagination from "../middlewares/pagination.js";

const router = express.Router();

router
  .get("/products", ProductController.getProducts)
  .post("/products", ProductController.postProduct)
  .put("/products/:id", ProductController.updateProduct)

export default router;   