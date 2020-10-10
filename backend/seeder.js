import mongoose from "mongoose";
import dotenv from "dotenv";
import "colors";
import { users, products } from "./data/index.js";
import { User, Product, Order } from "./models/index.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Order.deleteMany();
    await Product.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => ({
      ...product,
      user: adminUser,
    }));

    await Product.insertMany(sampleProducts);
    console.log("Data imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(error.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Order.deleteMany();
    await Product.deleteMany();

    console.log("Data Destroyed!".brightRed.inverse);
    process.exit();
  } catch (error) {
    console.error(error.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") destroyData();
else importData();
