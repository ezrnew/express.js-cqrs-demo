import { Router } from "express";
import { orderCreateSchema } from "./orderCommand.dto";
import { createOrder } from "./orderCommand.service";

const orderController = Router();

orderController.post("", async (req, res) => {
  const { error } = orderCreateSchema.validate(req.body);

  if (error) {
    res.status(400).send({ message: error.details[0].message });
    return;
  }

  const { customerId, products } = req.body;

  try {
    await createOrder(customerId, products);
    res.status(201).send({ message: "Order placed successfully" });
  } catch (err: any) {
    console.error(err);
    res.status(500).send({ message: err.message || "Failed to place order" });
  }
});

export default orderController;
