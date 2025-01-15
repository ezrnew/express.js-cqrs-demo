import Order from "../../database/schemas/product/order.schema";
import Product from "../../database/schemas/product/product.schema";
import mongoose from "mongoose";

export async function createOrder(
  customerId: string,
  products: { productId: string; quantity: number }[]
): Promise<void> {
  // validate if customer exists

  let totalAmount = 0;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    for (const { productId, quantity } of products) {
      const product = await Product.findById(productId).session(session);

      if (!product) {
        throw new Error(`Product with ID ${productId} not found`);
      }

      if (quantity > product.stock) {
        throw new Error(
          `Insufficient stock for product ${productId}: Only ${product.stock} items available, but ${quantity} requested.`
        );
      }

      product.stock -= quantity;
      await product.save({ session });

      totalAmount += product.price * quantity;
    }

    const order = new Order({ customerId, products, totalAmount });
    await order.save({ session });

    await session.commitTransaction();
  } catch (error: any) {
    await session.abortTransaction();
    throw new Error(error.message || "Failed to create order");
  } finally {
    session.endSession();
  }
}
