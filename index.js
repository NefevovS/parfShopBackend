import Express from "express";
import dotenv from "dotenv";
import { sequelize } from "./db.js";
import models from "./models/models.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = new Express();

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started PORT:${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();

app.get("/", (req, res) => {
  res.send("asdh");
});
