import Router from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = new Router();

router.post("/registration", userController.registation);
router.post("/login", userController.login);
router.get("/auth", authMiddleware, userController.checkAuth);

export default router;
