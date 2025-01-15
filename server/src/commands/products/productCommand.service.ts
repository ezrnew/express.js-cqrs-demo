import Product from "../../database/schemas/product/product.schema";
import { ProductCreateDto } from "./productCommand.dto";

export async function createProduct(productCreateDto: ProductCreateDto) {
  try {
    const newProduct = new Product({
      name: productCreateDto.name,
      description: productCreateDto.description,
      price: productCreateDto.price,
      stock: productCreateDto.stock,
    });

    await newProduct.save();
  } catch (err: any) {
    if (err.name === "ValidationError") {
      console.error("Validation error:", err.errors);
      throw new Error("Validation error occurred while creating product");
    }
  }
}

export async function restockProduct(
  productId: string,
  quantity: number
): Promise<void> {
  try {
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found");
    }
    product.stock += quantity;
    await product.save();
  } catch (err: any) {
    if (err.name === "CastError") {
      throw new Error("Invalid product ID format");
    }
    throw new Error(err.message || "An unexpected error occurred");
  }
}

export async function sellProduct(
  productId: string,
  quantity: number
): Promise<void> {
  try {
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    if (quantity > product.stock) {
      throw new Error(
        `Insufficient stock: Only ${product.stock} items available, but ${quantity} requested.`
      );
    }

    product.stock -= quantity;

    await product.save();
  } catch (err: any) {
    if (err.name === "CastError") {
      throw new Error("Invalid product ID format");
    }
    throw new Error(err.message || "An unexpected error occurred");
  }
}
