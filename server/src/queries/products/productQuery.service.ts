import Product from "../../database/schemas/product/product.schema";

export async function getAllProducts() {
  try {
    const products = await Product.find();
    return products;
  } catch (err) {
    throw new Error("Failed to fetch products");
  }
}

export async function getProductById(productId: string) {
  try {
    const product = await Product.findById(productId);
    return product;
  } catch (err) {
    throw new Error("Product not found");
  }
}
