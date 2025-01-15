import { Router } from "express";
import productQueriesController from "./products/productQuery.controller";

const queriesRouter = Router();

queriesRouter.use("/products", productQueriesController);

export default queriesRouter;