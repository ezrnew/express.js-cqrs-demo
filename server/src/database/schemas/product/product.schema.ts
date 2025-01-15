import mongoose from "mongoose";
import { db } from "../../database.schema";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  description: {
    type: String,
    required: true,
    maxLength: 50,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Product = mongoose.model(db.product, productSchema);

export default Product;
