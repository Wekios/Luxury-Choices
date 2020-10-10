import express from "express";
import asyncHandler from "express-async-handler";
import { Product } from "../models/index.js";

const productRoutes = express.Router();

productRoutes.get(
  "/",
  asyncHandler(async (_req, res) => {
    const products = await Product.find({});

    res.json(products);
  })
);

/** @description Fetch single product
 *  @route GET /api/products/:id
 *  @access Public
 */
productRoutes.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

export { productRoutes };
