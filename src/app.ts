import express, { Router } from "express";
import config from "config";
import connect from "./db/connect";
import morgan from "morgan";
import postRoutes from "./routes/routes";

// import { deserializeUser } from "./middleware";

const port: number = config.get("port");
const host: string = config.get("host");
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connect();

app.use("/api", postRoutes);

app.listen(port, () => {
  console.log(`Server listing at ${port}`);
});
