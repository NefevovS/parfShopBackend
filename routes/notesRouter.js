import Router from "express";
import notesController from "../controllers/notesController.js";
const router = new Router();

router.post("/", notesController.create);
router.get("/", notesController.getAll);

export default router;
