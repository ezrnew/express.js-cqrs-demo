import { Router } from "express";
import productCommandsController from "./products/productCommand.controller";
import orderCommandsController from "./orders/orderCommand.controller";

const commandsRouter = Router();

commandsRouter.use("/products", productCommandsController);
commandsRouter.use("/orders", orderCommandsController);

export default commandsRouter;
