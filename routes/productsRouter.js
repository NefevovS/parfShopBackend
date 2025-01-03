import Router from "express";
import productsController from "../controllers/productsController.js";
const router = new Router();

router.post("/", productsController.create);
router.get("/", productsController.getAll);
router.get("/:id", productsController.getOne);
router.delete("/:id",productsController.delete)

export default router;
