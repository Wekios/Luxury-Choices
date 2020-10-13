import express from "express";
import dotenv from "dotenv";
import "colors";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { productRoutes, userRoutes } from "./routes/index.js";

dotenv.config(); // * This gives access to the ENV variables by using dotenv package

connectDB();

const app = express();

app.use(express.json()); // * Allows us to accept JSON data in the body

app.get("/", (_req, res) => {
  res.send("API is running");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);
