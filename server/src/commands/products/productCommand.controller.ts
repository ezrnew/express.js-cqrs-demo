import { Router } from "express";
import {
  createProduct,
  restockProduct,
  sellProduct,
} from "./productCommand.service";
import {
  productCreateSchema,
  restockProductSchema,
} from "./productCommand.dto";

const productCommandsController = Router();

// POST create product
productCommandsController.post("", async (req, res) => {
  const { error } = productCreateSchema.validate(req.body);

  if (error) {
    res.status(400).send({ message: error.details[0].message });
    return;
  }

  const data = req.body;

  try {
    const newProduct = await createProduct(data);

    res.status(201).send(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error creating product" });
  }
});

// POST restock
productCommandsController.post("/:id/restock", async (req, res) => {
  const { id } = req.params;

  const { error } = restockProductSchema.validate(req.body);

  if (error) {
    res.status(400).send({ message: error.details[0].message });
    return;
  }

  const { quantity } = req.body;

  try {
    await restockProduct(id, +quantity);
    res.status(200).send({ message: "Product stock updated successfully" });
  } catch (err: any) {
    console.error(err);
    if (err.message === "Product not found") {
      res.status(404).send({ message: "Product not found" });
    } else if (err.message === "Invalid product ID format") {
      res.status(400).send({ message: "Invalid product ID format" });
    } else {
      res.status(500).send({ message: "Error updating product stock" });
    }
  }
});

// POST sell
productCommandsController.post("/:id/sell", async (req, res) => {
  const { id } = req.params;

  const { error } = restockProductSchema.validate(req.body);

  if (error) {
    res.status(400).send({ message: error.details[0].message });
    return;
  }

  const { quantity } = req.body;

  try {
    await sellProduct(id, +quantity);
    res.status(200).send({ message: "Product stock updated successfully" });
  } catch (err: any) {
    console.error(err);
    if (err.message === "Product not found") {
      res.status(404).send({ message: "Product not found" });
    } else if (err.message === "Invalid product ID format") {
      res.status(400).send({ message: "Invalid product ID format" });
    } else {
      res.status(500).send({ message: "Error updating product stock" });
    }
  }
});

export default productCommandsController;
