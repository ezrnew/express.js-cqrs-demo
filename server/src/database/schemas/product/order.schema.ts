import mongoose from "mongoose";
import { db } from "../../database.schema";

const OrderSchema = new mongoose.Schema(
  {
    customerId: { type: String, required: true }, // string for simplicity
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: db.product,
        },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model(db.order, OrderSchema);

export default Order;
