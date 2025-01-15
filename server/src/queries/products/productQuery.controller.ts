import { Router } from "express";
import { getAllProducts, getProductById } from "./productQuery.service";
import { productGetByIdDto } from "./productQuery.validation";

const productQueriesController = Router();

// GET all products
productQueriesController.get("", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).send(products);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server error" });
  }
});

// GET product by ID
productQueriesController.get("/:id", async (req, res) => {
  try {
    const { error } = productGetByIdDto.validate(req.params);
    if (error) {
      res.status(400).send({ message: error.details[0].message });
      return;
    }

    const productId = req.params.id;
    const product = await getProductById(productId);

    if (!product) {
      res.status(404).send({ message: "Product not found" });
      return;
    }

    res.status(200).send(product);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server error" });
  }
});

export default productQueriesController;
