import Router from "express";
import basketProductsRouter from "./basketProductsRouter.js";
import basketRouter from "./basketRouter.js";
import brandRouter from "./brandRouter.js";
import productInfoRouter from "./productsInfoRouter.js";
import productsRouter from "./productsRouter.js";
import typeRouter from "./typeRouter.js";
import userRouter from "./userRouter.js";
import notesRouter from "./notesRouter.js";
import producNotesRouter from "./productNotesRouter.js";

import errorHandlingMiddleware from "../middleware/ErrorHandlingMiddleware.js";

const router = new Router();

router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/brand", brandRouter);
router.use("/products", productsRouter);
router.use("/productsInfo", productInfoRouter);
router.use("/basket", basketRouter);
router.use("/basketProducts", basketProductsRouter);
router.use("/notes", notesRouter);
router.use("/productnotes", producNotesRouter);

router.use(errorHandlingMiddleware);

export default router;
