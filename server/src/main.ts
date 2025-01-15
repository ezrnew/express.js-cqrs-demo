import express, { urlencoded, json } from "express";
import dotenv from "dotenv";
import queriesRouter from "./queries/queries.router";
import { connectDB } from "./database/database.connector";
import commandsRouter from "./commands/commands.router";

async function bootstrap() {
  dotenv.config();

  const port = process.env.PORT || 8000;
  const app = express();

  await connectDB();

  app.use(urlencoded({ extended: true }));
  app.use(json());

  app.use("/query", queriesRouter);
  app.use("/command", commandsRouter);

  app.listen(port, () => {
    console.log(`Server is listening at port ${port}`);
  });
}

bootstrap();
