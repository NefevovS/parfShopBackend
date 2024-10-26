import Express from "express";
import dotenv from "dotenv";
import { sequelize } from "./db.js";
import models from "./models/models.js";
import cors from "cors";
import router from "./routes/index.js";
import fileUpload from "express-fileupload";
import path from "node:path";
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = new Express();

app.use(cors());
app.use(Express.json());
app.use(Express.static(path.resolve(import.meta.dirname, "static")));
app.use(fileUpload());
app.use("/api", router);

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
  res.send(console.log(import.meta.dirname));
});
