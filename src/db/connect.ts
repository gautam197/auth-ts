import mongoose from "mongoose";
import config from "config";
import log from "../logger";

const connect = () => {
  const dbUri: string = config.get("dbUri");
  mongoose
    .connect(dbUri)
    .then(() => {
      log.info("Database connected successfully!!");
    })
    .catch((err) => {
      log.info("Err", err);
      process.exit(1);
    });
};


export default connect