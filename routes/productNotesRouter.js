import Router from "express";
import productNotesController from "../controllers/productNotesController.js";
const router = new Router();

router.post("/", productNotesController.create);
router.get("/", productNotesController.getAll);

export default router;
